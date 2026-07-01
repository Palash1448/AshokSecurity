import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Guard types matching the Required Guards form
const GUARD_TYPES = [
  "Security Officer",
  "Security Supervisor",
  "Security Guard",
  "Lady Guard",
  "Housekeeping (Male)",
  "Housekeeping (Female)",
  "Car Parking Guard"
];

// Rate data interface
export interface RateData {
  id?: string;
  guardType: string;
  district: string;
  hourlyRate: number;
  monthlyRate: number;
  description: string;
  createdAt?: any;
  updatedAt?: any;
}

// Supported districts with configured rates
const MAHARASHTRA_DISTRICTS = [
  "Sangli",
  "Solapur",
  "Satara",
  "Pune",
  "Mumbai",
  "Raigad",
  "Nashik"
];

// Mock rates service (you can replace with Firebase later)
const mockRatesService = {
  async getAll(): Promise<RateData[]> {
    const stored = localStorage.getItem('securityRates');
    return stored ? JSON.parse(stored) : [];
  },

  async create(data: Omit<RateData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const rates = await this.getAll();
    const newRate: RateData = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    rates.push(newRate);
    localStorage.setItem('securityRates', JSON.stringify(rates));
    return newRate.id!;
  },

  async update(id: string, data: Omit<RateData, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const rates = await this.getAll();
    const index = rates.findIndex(rate => rate.id === id);
    if (index !== -1) {
      rates[index] = { ...rates[index], ...data, updatedAt: new Date() };
      localStorage.setItem('securityRates', JSON.stringify(rates));
    }
  },

  async delete(id: string): Promise<void> {
    const rates = await this.getAll();
    const filtered = rates.filter(rate => rate.id !== id);
    localStorage.setItem('securityRates', JSON.stringify(filtered));
  }
};

const RateManagement = () => {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<RateData | null>(null);
  const [formData, setFormData] = useState({
    guardType: '',
    district: '',
    hourlyRate: '',
    monthlyRate: '',
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const ratesData = await mockRatesService.getAll();
      setRates(ratesData);
    } catch (error) {
      console.error('Error fetching rates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      guardType: '',
      district: '',
      hourlyRate: '',
      monthlyRate: '',
      description: ''
    });
  };

  const handleAddRate = async () => {
    if (!formData.guardType || !formData.district || !formData.hourlyRate || !formData.monthlyRate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await mockRatesService.create({
        guardType: formData.guardType,
        district: formData.district,
        hourlyRate: parseFloat(formData.hourlyRate),
        monthlyRate: parseFloat(formData.monthlyRate),
        description: formData.description
      });

      toast({
        title: "Success",
        description: "Rate added successfully",
      });

      resetForm();
      setIsAddDialogOpen(false);
      fetchRates();
    } catch (error) {
      console.error('Error adding rate:', error);
      toast({
        title: "Error",
        description: "Failed to add rate",
        variant: "destructive",
      });
    }
  };

  const handleEditRate = async () => {
    if (!formData.guardType || !formData.district || !formData.hourlyRate || !formData.monthlyRate || !editingRate?.id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await mockRatesService.update(editingRate.id, {
        guardType: formData.guardType,
        district: formData.district,
        hourlyRate: parseFloat(formData.hourlyRate),
        monthlyRate: parseFloat(formData.monthlyRate),
        description: formData.description
      });

      toast({
        title: "Success",
        description: "Rate updated successfully",
      });

      resetForm();
      setEditingRate(null);
      setIsEditDialogOpen(false);
      fetchRates();
    } catch (error) {
      console.error('Error updating rate:', error);
      toast({
        title: "Error",
        description: "Failed to update rate",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRate = async (id: string, guardType: string) => {
    if (!confirm(`Are you sure you want to delete the rate for "${guardType}"?`)) {
      return;
    }

    try {
      await mockRatesService.delete(id);
      toast({
        title: "Success",
        description: "Rate deleted successfully",
      });
      fetchRates();
    } catch (error) {
      console.error('Error deleting rate:', error);
      toast({
        title: "Error",
        description: "Failed to delete rate",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (rate: RateData) => {
    setEditingRate(rate);
    setFormData({
      guardType: rate.guardType,
      district: rate.district,
      hourlyRate: rate.hourlyRate.toString(),
      monthlyRate: rate.monthlyRate.toString(),
      description: rate.description
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Rate Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading rates...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Rate Management
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={resetForm}>
                <Plus className="h-4 w-4" />
                Add Rate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Rate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guardType">Guard Type</Label>
                  <Select value={formData.guardType} onValueChange={(value) => handleInputChange('guardType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guard type" />
                    </SelectTrigger>
                    <SelectContent>
                      {GUARD_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {MAHARASHTRA_DISTRICTS.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    placeholder="e.g., 150"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRate">Monthly Rate (₹)</Label>
                  <Input
                    id="monthlyRate"
                    type="number"
                    value={formData.monthlyRate}
                    onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                    placeholder="e.g., 25000"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the role"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRate}>
                    Add Rate
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {rates.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No rates found. Add your first rate to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {rates.map((rate) => (
              <div
                key={rate.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-lg">{rate.guardType}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {rate.district}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Hourly:</span> ₹{rate.hourlyRate}
                    </div>
                    <div>
                      <span className="font-medium">Monthly:</span> ₹{rate.monthlyRate.toLocaleString()}
                    </div>
                  </div>
                  {rate.description && (
                    <p className="text-sm text-muted-foreground mt-2">{rate.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(rate)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRate(rate.id!, rate.guardType)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editGuardType">Guard Type</Label>
              <Select value={formData.guardType} onValueChange={(value) => handleInputChange('guardType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guard type" />
                </SelectTrigger>
                <SelectContent>
                  {GUARD_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editDistrict">District</Label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {MAHARASHTRA_DISTRICTS.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="editHourlyRate">Hourly Rate (₹)</Label>
              <Input
                id="editHourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                placeholder="e.g., 150"
              />
            </div>
            <div>
              <Label htmlFor="editMonthlyRate">Monthly Rate (₹)</Label>
              <Input
                id="editMonthlyRate"
                type="number"
                value={formData.monthlyRate}
                onChange={(e) => handleInputChange('monthlyRate', e.target.value)}
                placeholder="e.g., 25000"
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Input
                id="editDescription"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the role"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditRate}>
                Update Rate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RateManagement;