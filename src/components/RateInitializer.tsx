import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Database, RefreshCw, Trash2, CheckCircle } from "lucide-react";
import {
    initializeDistrictRates,
    getCurrentRates,
    clearAllRates,
    areRatesInitialized
} from '@/utils/initializeRates';

const RateInitializer: React.FC = () => {
    const { toast } = useToast();
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [rateCount, setRateCount] = React.useState(0);

    useEffect(() => {
        checkInitializationStatus();
    }, []);

    const checkInitializationStatus = () => {
        const initialized = areRatesInitialized();
        const rates = getCurrentRates();
        setIsInitialized(initialized);
        setRateCount(rates.length);
    };

    const handleInitialize = () => {
        try {
            initializeDistrictRates();
            checkInitializationStatus();
            toast({
                title: "Success",
                description: "District-based rates initialized successfully!",
            });
        } catch (error) {
            console.error('Error initializing rates:', error);
            toast({
                title: "Error",
                description: "Failed to initialize rates",
                variant: "destructive",
            });
        }
    };

    const handleClear = () => {
        if (confirm('Are you sure you want to clear all rates? This action cannot be undone.')) {
            try {
                clearAllRates();
                checkInitializationStatus();
                toast({
                    title: "Success",
                    description: "All rates cleared successfully",
                });
            } catch (error) {
                console.error('Error clearing rates:', error);
                toast({
                    title: "Error",
                    description: "Failed to clear rates",
                    variant: "destructive",
                });
            }
        }
    };

    const handleRefresh = () => {
        checkInitializationStatus();
        toast({
            title: "Refreshed",
            description: "Rate status updated",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Rate Initialization
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Status Display */}
                    <div className="p-4 border rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Status:</span>
                            <div className="flex items-center gap-2">
                                {isInitialized ? (
                                    <>
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-green-600 font-medium">Initialized</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-orange-600 font-medium">Not Initialized</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Total Rates:</span>
                            <span className="text-lg font-bold">{rateCount}</span>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                            District-Based Rates (Security Guard Only):
                        </h4>
                        <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
                            <li>• Sangli - ₹65/hr, ₹15,600/month</li>
                            <li>• Solapur - ₹65/hr, ₹15,600/month</li>
                            <li>• Satara - ₹65/hr, ₹15,600/month</li>
                            <li>• Pune - ₹75/hr, ₹18,000/month</li>
                            <li>• Mumbai - ₹80/hr, ₹19,200/month</li>
                            <li>• Raigad - ₹80/hr, ₹19,200/month</li>
                            <li>• Nashik - ₹75/hr, ₹18,000/month</li>
                        </ul>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                            7 district rates for Security Guard + 6 standard rates for other guard types (13 total rates)
                        </p>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Button
                            onClick={handleInitialize}
                            className="flex-1 flex items-center gap-2"
                            disabled={isInitialized}
                        >
                            <Database className="h-4 w-4" />
                            {isInitialized ? 'Already Initialized' : 'Initialize Rates'}
                        </Button>
                        <Button
                            onClick={handleRefresh}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="destructive"
                            className="flex items-center gap-2"
                            disabled={!isInitialized}
                        >
                            <Trash2 className="h-4 w-4" />
                            Clear All
                        </Button>
                    </div>

                    {/* Warning */}
                    {!isInitialized && (
                        <div className="p-3 border border-orange-300 rounded-lg bg-orange-50 dark:bg-orange-950">
                            <p className="text-sm text-orange-800 dark:text-orange-200">
                                ⚠️ Rates are not initialized. Click "Initialize Rates" to set up district-based pricing.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default RateInitializer;
