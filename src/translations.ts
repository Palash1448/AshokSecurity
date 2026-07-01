export type Language = "en" | "mr";

export type TFunction = (key: string) => string;

export const translations: Record<Language, any> = {
  en: {
    nav: {
      since: "Since 2008",
      brand: "ASHOK SECURITY SERVICES",
      home: "Home",
      about: "About Us",
      services: "Services",
      clients: "Our Clients",
      contact: "Contact",
      support: "24×7 Support",
      inquiry: "Inquiry",
      inquiryRequiredGuards: "Required Guards",
      inquiryJobOpenings: "Job Openings",
    },
    hero: {
      titleMain: "Building trust through",
      titleHighlight: "protection",
      description:
        "Trained, disciplined and dependable guards backed by real-time monitoring, rapid escalation protocols, and leadership with more than 18 years of on-ground experience.",
      stats: {
        guards: "Guards Deployed",
        districts: "Districts Covered",
        responseTime: "Avg. Response Time",
        satisfaction: "Client Satisfaction",
      },
    },
    services: {
      badge: "What We Offer",
      heading: "Our Security Services",
      description:
        "Comprehensive security solutions tailored to meet your specific needs and ensure complete peace of mind.",
      items: {
        event: {
          title: "Event Security Management",
          description:
            "Professional crowd control teams, metal detectors, and VIP protection for venues up to 10,000 attendees.",
        },
        static: {
          title: "Static Guards for Homes & Offices",
          description:
            "Armed and unarmed guard deployments, biometric checkpoints, and visitor intelligence reports.",
        },
        cctv: {
          title: "CCTV Monitoring & Control",
          description:
            "AI-assisted monitoring center with real-time incident flags and rapid dispatch protocols.",
        },
        custom: {
          title: "Custom Security Solutions",
          description:
            "Threat modeling, risk assessments, and layered defense strategies tailored to your operation.",
        },
      },
    },
    about: {
      badge: "Legacy",
      heading: "About Ashok Security Services",
      govApproved: "Government Approved Security Agency",
      since: "serving since 2008.",
      paragraph1:
        "Founded by Mr. A. R. Deshmukh, a retired army officer, Ashok Security Services began its first assignment at Sanjay Bhokre Group of Institutes, Miraj with 10 guards.",
      paragraph2:
        "Since 2024, it is efficiently managed by his son, a trained Maharashtra Ex. Servicemen Corporation Ltd., Satara professional with 10 years of experience.",
      paragraph3:
        "We specialize in providing trained, disciplined and reliable security personnel for residential, commercial and industrial clients.",
      paragraph4:
        "Our services cover event security, static guards, surveillance and custom-tailored solutions to meet client-specific requirements.",
      paragraph5:
        "With a commitment to safety, professionalism and integrity, Ashok Security Services has steadily expanded its operations, earning the trust of clients across Maharashtra.",
      directorName: "Mr. A. A. Deshmukh",
      directorTitle: "Director",
      companyVisionTitle: "Company Vision",
      companyVisionText:
        "Through unparalleled customer relationships, we provide proactive solutions, cutting-edge smart technology, and tailored services that allow customers to focus on their core business.",
      companyPurposeTitle: "Company Purpose",
      companyPurposeText:
        "There for you, serving and safeguarding customers, communities, and people around the world.",
      values: {
        trust: {
          title: "Trust",
          description:
            "Trustworthy personnel who understand that trust is the foundation of our business.",
        },
        spirit: {
          title: "Spirit",
          description:
            "Dedicated team members committed to service quality and customer satisfaction 24×7.",
        },
        professionalism: {
          title: "Professionalism",
          description:
            "Trained and disciplined security guards maintaining the highest standards.",
        },
        service: {
          title: "24/7 Service",
          description:
            "Round-the-clock availability to ensure your safety and peace of mind.",
        },
      },
    },
    clients: {
      badge: "Trust",
      heading: "Our Clients",
      description: "Trusted by leading organizations across Maharashtra",
      verifiedBadge: "Verified",
      complianceHeading: "Compliance & Company Details",
      details: {
        pasara: "Pasara License No.",
        pan: "PAN No.",
        pcc: "PCC",
        shop: "Shop & Establ.",
        pt: "P. T. Regn. No.",
        pf: "Provident Fund No.",
        esic: "ESIC Allotment No.",
        gst: "GST No.",
      },
    },
    contact: {
      badge: "Contact",
      heading: "Speak with Command Center",
      subtitle: "Get in touch for professional security services",
      formBadge: "Rapid Response",
      formHeading: "Share your security requirements",
      placeholders: {
        name: "Full Name",
        email: "Email",
        phone: "Phone Number",
        organization: "Organization (Optional)",
        message: "Share details about your requirement...",
      },
      submit: "Request Consultation",
      info: {
        headOffice: "Head Office",
        phone: "Phone",
        email: "Email",
        emergencyService: "24/7 Emergency Service",
        branchesHeading: "Our Branches",
        puneBranch: "Pune Branch",
        panvelBranch: "Panvel Branch",
      },
    },
    footer: {
      brand: "ASHOK SECURITY SERVICES",
      tagline:
        "Government Approved Security Agency providing professional security services since 2008.",
      quickLinks: "Quick Links",
      links: {
        home: "Home",
        services: "Services",
        about: "About Us",
        clients: "Our Clients",
        contact: "Contact",
      },
      ourServices: "Our Services",
      serviceList: {
        event: "Event Security Management",
        static: "Static Guards for Homes & Offices",
        cctv: "CCTV Monitoring & Control",
        custom: "Custom Security Solutions",
        industrial: "Industrial Security",
        bank: "Bank Security",
      },
      copyright:
        " 2024 Ashok Security Services. Desined by INFOYASHONAND TECHNOLOGY PVT.LTD. All rights reserved.",
    },
  },
  mr: {
    nav: {
      since: "२००८ पासून",
      brand: "ASHOK SECURITY SERVICES",
      home: "मुखपृष्ठ",
      about: "आमच्याबद्दल",
      services: "सेवा",
      clients: "आमचे ग्राहक",
      contact: "संपर्क",
      support: "२४×७ सहाय्य",
      inquiry: "चौकशी",
      inquiryRequiredGuards: "गार्डची आवश्यकता",
      inquiryJobOpenings: "नोकरीच्या संधी",
    },
    hero: {
      titleMain: "विश्वास निर्माण करणारी",
      titleHighlight: "सुरक्षा",
      description:
        "प्रशिक्षित, शिस्तबद्ध आणि विश्वासार्ह सुरक्षा रक्षक, रिअल-टाइम मॉनिटरिंग, जलद प्रतिसाद प्रक्रिया आणि १८+ वर्षांच्या प्रत्यक्ष अनुभव असलेल्या नेतृत्वाच्या पाठबळासह.",
      stats: {
        guards: "नियुक्त सुरक्षा रक्षक",
        districts: "आवृत जिल्हे",
        responseTime: "सरासरी प्रतिसाद वेळ",
        satisfaction: "ग्राहक समाधान",
      },
    },
    services: {
      badge: "आम्ही काय देतो",
      heading: "आमच्या सुरक्षा सेवा",
      description:
        "आपल्या गरजेनुसार तयार केले सर्वसमावेशक सुरक्षा उपाय जे पूर्ण सुरक्षितता आणि निश्चिंती देतात.",
      items: {
        event: {
          title: "इव्हेंट सुरक्षा व्यवस्थापन",
          description:
            "मोठ्या कार्यक्रमांसाठी प्रशिक्षित गर्दी नियंत्रण पथके, मेटल डिटेक्टर आणि व्हीआयपी सुरक्षा व्यवस्था.",
        },
        static: {
          title: "घर व कार्यालयांसाठी स्थिर सुरक्षा रक्षक",
          description:
            "सशस्त्र व निःशस्त्र रक्षक, बायोमेट्रिक तपासणी बिंदू आणि अभ्यागतांची नोंद व अहवाल.",
        },
        cctv: {
          title: "सीसीटीव्ही निरीक्षण व नियंत्रण",
          description:
            "एआय-सक्षम नियंत्रण कक्ष, रिअल-टाइम अलर्ट आणि तात्काळ पथक पाठविण्याची व्यवस्था.",
        },
        custom: {
          title: "कस्टम सुरक्षा उपाय",
          description:
            "धोका विश्लेषण, जोखीम मूल्यांकन व आपल्या व्यवसायानुसार स्तरित सुरक्षा धोरणे.",
        },
      },
    },
    about: {
      badge: "परंपरा",
      heading: "अशोक सिक्युरिटी सर्व्हिसेस बद्दल",
      govApproved: "शासकीय मान्यता प्राप्त सुरक्षा संस्था",
      since: "सन २००८ पासून सेवा.",
      paragraph1:
        "सेवानिवृत्त सैनिक श्री. ए. आर. देशमुख यांच्या मार्गदर्शनाखाली अशोक सिक्युरिटी सर्व्हिसेसची सुरुवात झाली. आमची पहिली नेमणूक संजय भोकरे ग्रुप ऑफ इन्स्टिट्यूट्स, मिरज येथे १० रक्षकांसह झाली.",
      paragraph2:
        "सन २०२४ पासून ही संस्था त्यांच्या सुपुत्रांद्वारे प्रभावीपणे चालवली जाते. ते महाराष्ट्र एक्स-सर्व्हिसमन कॉर्पोरेशन लि., सातारा प्रशिक्षित व १० पेक्षा अधिक वर्षांचा अनुभव असलेले व्यावसायिक आहेत.",
      paragraph3:
        "आम्ही निवासी, व्यापारी आणि औद्योगिक प्रकल्पांसाठी प्रशिक्षित, शिस्तबद्ध आणि विश्वासार्ह सुरक्षा कर्मचारी पुरवतो.",
      paragraph4:
        "इव्हेंट सुरक्षा, स्थिर रक्षक, सर्व्हेलन्स तसेच ग्राहकांच्या गरजेनुसार सानुकूल सुरक्षा उपाय ही आमची विशेषता आहे.",
      paragraph5:
        "सुरक्षा, व्यावसायिकता आणि प्रामाणिकपणा या मूल्यांमुळे आम्ही महाराष्ट्रभर अनेक ग्राहकांचा विश्वास जिंकला आहे.",
      directorName: "श्री. ए. ए. देशमुख",
      directorTitle: "संचालक",
      companyVisionTitle: "कंपनी व्हिजन",
      companyVisionText:
        "ग्राहकांशी दृढ नाते राखत, अत्याधुनिक स्मार्ट तंत्रज्ञान आणि सानुकूलित सेवा पुरवून आम्ही त्यांना त्यांच्या मूळ व्यवसायावर लक्ष केंद्रित करण्यास सक्षम करतो.",
      companyPurposeTitle: "कंपनीचे ध्येय",
      companyPurposeText:
        "ग्राहक, समाज आणि लोकांच्या सुरक्षेसाठी सदैव तत्पर.",
      values: {
        trust: {
          title: "विश्वास",
          description:
            "आमचे कर्मचारी प्रामाणिकपणे आणि जबाबदारीने काम करून ग्राहकांचा विश्वास जपतात.",
        },
        spirit: {
          title: "सेवा भावना",
          description:
            "सेवा गुणवत्तेला आणि ग्राहक समाधानाला नेहमी प्राधान्य देणारी समर्पित टीम.",
        },
        professionalism: {
          title: "व्यावसायिकता",
          description:
            "प्रशिक्षित आणि शिस्तबद्ध सुरक्षा रक्षक, सर्वोच्च मानकांची काटेकोरपणे अंमलबजावणी करतात.",
        },
        service: {
          title: "२४/७ सेवा",
          description:
            "सतत उपलब्ध राहून आपल्या सुरक्षेची आणि निश्चिंतीची हमी देणारी सेवा.",
        },
      },
    },
    clients: {
      badge: "विश्वास",
      heading: "आमचे ग्राहक",
      description: "महाराष्ट्रातील अग्रगण्य संस्थांचा आमच्यावर विश्वास",
      verifiedBadge: "प्रमाणित",
      complianceHeading: "कायदेशीर कागदपत्रे व कंपनी तपशील",
      details: {
        pasara: "पासारा परवाना क्र.",
        pan: "पॅन क्रमांक",
        pcc: "पीसीसी",
        shop: "दुकान व आस्थापना क्र.",
        pt: "व्यावसायिक कर नोंद क्र.",
        pf: "पी.एफ. क्रमांक",
        esic: "ईएसआयसी क्रमांक",
        gst: "जीएसटी क्रमांक",
      },
    },
    contact: {
      badge: "संपर्क",
      heading: "कमांड सेंटरशी बोला",
      subtitle: "व्यावसायिक सुरक्षा सेवेकरिता आमच्याशी संपर्क साधा",
      formBadge: "त्वरित प्रतिसाद",
      formHeading: "आपल्या सुरक्षा गरजा सांगा",
      placeholders: {
        name: "पूर्ण नाव",
        email: "ई-मेल",
        phone: "फोन क्रमांक",
        organization: "संस्था (ऐच्छिक)",
        message: "आपल्या गरजांविषयी सविस्तर लिहा...",
      },
      submit: "सल्लामसलतीची विनंती करा",
      info: {
        headOffice: "मुख्य कार्यालय",
        phone: "फोन",
        email: "ई-मेल",
        emergencyService: "२४/७ आपत्कालीन सेवा",
        branchesHeading: "आमच्या शाखा",
        puneBranch: "पुणे शाखा",
        panvelBranch: "पनवेल शाखा",
      },
    },
    footer: {
      brand: "ASHOK SECURITY SERVICES",
      tagline:
        "शासकीय मान्यता प्राप्त सुरक्षा संस्था, २००८ पासून व्यावसायिक सुरक्षा सेवा पुरवित आहे.",
      quickLinks: "द्रुत दुवे",
      links: {
        home: "मुखपृष्ठ",
        services: "सेवा",
        about: "आमच्याबद्दल",
        clients: "आमचे ग्राहक",
        contact: "संपर्क",
      },
      ourServices: "आमच्या सेवा",
      serviceList: {
        event: "इव्हेंट सुरक्षा व्यवस्थापन",
        static: "घर व कार्यालयांसाठी स्थिर सुरक्षा रक्षक",
        cctv: "सीसीटीव्ही निरीक्षण व नियंत्रण",
        custom: "कस्टम सुरक्षा उपाय",
        industrial: "औद्योगिक सुरक्षा",
        bank: "बँक सुरक्षा",
      },
      copyright:
        "© २०२४ अशोक सिक्युरिटी सर्व्हिसेस. डिझाइन: INFOYASHONAND TECHNOLOGY PVT.LTD. सर्व हक्क राखीव.",
    },
  },
};

export const createTranslator = (language: Language): TFunction => {
  return (key: string) => {
    const segments = key.split(".");
    let current: any = translations[language];

    for (const segment of segments) {
      if (current && Object.prototype.hasOwnProperty.call(current, segment)) {
        current = current[segment];
      } else {
        return key; // fallback
      }
    }

    return typeof current === "string" ? current : key;
  };
};
