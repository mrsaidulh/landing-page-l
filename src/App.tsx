import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminPanel } from './components/AdminPanel';
import { 
  BookOpen, 
  Check, 
  HelpCircle, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  Star, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  ChevronDown, 
  MessageSquare, 
  FileText, 
  AlertCircle, 
  Edit3, 
  PenTool,
  TrendingUp,
  UserCheck,
  Zap,
  Lock,
  Globe,
  Share2,
  Calendar,
  Clock,
  ThumbsUp,
  CheckCircle,
  Video,
  Users,
  Facebook,
  Linkedin,
  ArrowUp
} from 'lucide-react';

// Sample data for writing upgrade simulator
interface UpgradeSample {
  id: string;
  topic: string;
  title: string;
  prompt: string;
  badText: string;
  goodText: string;
  scoreBad: string;
  scoreGood: string;
  vocabularyTip: string;
  grammarTip: string;
  coherenceTip: string;
}

const UPGRADE_SAMPLES: UpgradeSample[] = [
  {
    id: "env",
    topic: "Environment (পরিবেশ)",
    title: "Global Warming and Carbon Emission",
    prompt: "Some people think that individuals can do nothing to improve the environment.",
    badText: "In my opinion, global warming is a very big problem because of humans. Normal people can't do anything to stop it, only governments must do work.",
    goodText: "It is widely argued that anthropogenic activities are a primary driver of global climate change. While individual actions might seem insignificant, collective community efforts combined with robust government regulations are paramount for ecological restoration.",
    scoreBad: "Band 5.0 - 5.5",
    scoreGood: "Band 7.5 - 8.0",
    vocabularyTip: "Replace 'very big problem' with 'primary driver' and 'ecological restoration'.",
    grammarTip: "Transformed two simple clauses into a complex sentence with an adverbial clause of concession ('While individual...').",
    coherenceTip: "Using linkers like 'while', 'collective' and 'combined with' brings logical progression."
  },
  {
    id: "edu",
    topic: "Education (শিক্ষা)",
    title: "University Education value",
    prompt: "Should high school graduates go directly to university or take a gap year?",
    badText: "I think people should go to university immediately. If they take a holiday, they will forget studying and they will get bad jobs later.",
    goodText: "Entering higher education immediately upon graduating high school is highly beneficial. A prolonged hiatus may not only disrupt a student's academic rhythm but also inadvertently prolong their entry into the professional workforce.",
    scoreBad: "Band 5.5",
    scoreGood: "Band 7.5+",
    vocabularyTip: "Used 'higher education', 'prolonged hiatus', 'academic rhythm' and 'professional workforce' instead of general words.",
    grammarTip: "Utilized modern passive constructions and sophisticated non-only-but-also correlations.",
    coherenceTip: "Created high-quality flow linking graduate actions directly to workforce career structures."
  },
  {
    id: "tech",
    topic: "Technology (প্রযুক্তি)",
    title: "AI & Human Employment",
    prompt: "Artificial Intelligence will replace human workers in the future.",
    badText: "Computers are very smart now and they will take all jobs. So people will have no money and life will be bad.",
    goodText: "The rapid ascendancy of artificial intelligence raises legitimate concerns regarding workforce displacement. Consequently, the low-tier labor market is vulnerable, necessitating immediate societal adaptation and skill-redefinition.",
    scoreBad: "Band 5.0",
    scoreGood: "Band 8.0",
    vocabularyTip: "Elevated 'computers are smart' to 'rapid ascendancy of artificial intelligence' and ' displacement'.",
    grammarTip: "Incorporated advanced gerund subjects and participial adjective structures.",
    coherenceTip: "Used logical causative linkers ('Consequently', 'Necessitating') for high-scoring cohesion."
  }
];

// Testimonials data for auto-sliding carousel
const TESTIMONIALS = [
  {
    id: "ts_1",
    name: "Nusrat Jahan",
    type: "Candidate (Academic)",
    band: "Band Score 7.5",
    writingScore: "Writing: 7.5",
    text: "I was previously stuck at a 6.0 in writing and couldn't reach 7.0. After the trainer evaluated my scripts, I understood my mistakes. He showed me line-by-line how to replace weak vocabulary and upgrade my sentence structures. This is a highly practical guideline!",
    rating: 5,
    avatarColor: "bg-emerald-600"
  },
  {
    id: "ts_2",
    name: "Zayed Hasan",
    type: "Candidate (General Training)",
    band: "Band Score 7.0",
    writingScore: "Writing: 7.0",
    text: "I was extremely worried about GT letter writing. The thesis templates and sentence patterns provided in the official materials helped me immensely. The 1-on-1 trainer feedback sessions were absolute masterclasses.",
    rating: 5,
    avatarColor: "bg-blue-600"
  },
  {
    id: "ts_3",
    name: "Tahmid Chowdhury",
    type: "Candidate (Academic)",
    band: "Band Score 8.0",
    writingScore: "Writing: 8.0",
    text: "To overcome Grammatical Range and Accuracy weaknesses, IELTS Revolution is an excellent choice. If you are struggling with writing anxiety, you should join this course without a second thought.",
    rating: 5,
    avatarColor: "bg-purple-600"
  },
  {
    id: "ts_4",
    name: "Farhana Huq",
    type: "Candidate (Academic)",
    band: "Band Score 7.5",
    writingScore: "Writing: 7.5",
    text: "সঠিক কোহেসিভ ডিভাইস এবং কমপ্লেক্স স্ট্রাকচারাল সেন্টেন্স লেখার নিয়মগুলো আমি এই কোর্স থেকেই সহজে আয়ত্ত করেছি। পূর্বের ৫.৫ স্কোর এখন ৭.৫-এ উন্নীত হয়েছে যা আমার প্রত্যাশার চেয়েও বেশি ছিল!",
    rating: 5,
    avatarColor: "bg-pink-600"
  },
  {
    id: "ts_5",
    name: "S. M. Rafiqul Islam",
    type: "Candidate (General Training)",
    band: "Band Score 7.5",
    writingScore: "Writing: 7.5",
    text: "The mock test evaluations with detailed feedback and estimated band score were extremely accurate. Highly recommended for busy working professionals who need quick and precise guidance.",
    rating: 5,
    avatarColor: "bg-amber-600"
  },
  {
    id: "ts_6",
    name: "Tasnim Ara",
    type: "Candidate (Academic)",
    band: "Band Score 7.0",
    writingScore: "Writing: 7.0",
    text: "আমার লেখার গ্রামাটিক্যাল ভুল এবং দুর্বল ইন্ট্রোডাকশন পরিবর্তন করার সঠিক নিয়ম এনারা অনেক সহজ করে শিখিয়েছেন। তাদের অডিও ফাইল ফিডব্যাক এবং জুমে সরাসরি হেল্প অসাধারণ ছিল।",
    rating: 5,
    avatarColor: "bg-indigo-600"
  }
];

export default function App() {
  const [showAdminView, setShowAdminView] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  // Testimonial Carousel States
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialAutoPlaying, setIsTestimonialAutoPlaying] = useState(true);
  const [testimonialVisibleCount, setTestimonialVisibleCount] = useState(3);

  // Navigation states
  const [activeTab, setActiveTab] = useState<'all' | 'task1' | 'task2' | 'evaluation'>('all');

  // Promo Banner State for animated rotating text
  const bannerTexts = [
    {
      text: "স্পেশাল অফার! আজ ভর্তি হলে পাচ্ছেন ১০টি ফুল রাইটিং স্ক্রিপ্ট একদম ফ্রি ইভ্যালুয়েশন!",
      cta: "অফারটি নিন ➔"
    },
    {
      text: "Special Offer! Enroll today and get 10 Full Writing Script evaluations completely FREE!",
      cta: "Grab Offer ➔"
    }
  ];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Countdown Timer state: sets to end of current day, or adds 24h if under 4h left
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getTargetTime = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(23, 59, 59, 999);
      
      // If less than 4 hours remaining, set target to tomorrow night to maintain dynamic pressure
      if (target.getTime() - now.getTime() < 4 * 60 * 60 * 1000) {
        target.setDate(target.getDate() + 1);
      }
      return target;
    };

    const targetTime = getTargetTime();

    const updateTimer = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerTexts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Resize Handler to make Carousel responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTestimonialVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setTestimonialVisibleCount(2);
      } else {
        setTestimonialVisibleCount(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Testimonial Auto Slider effect
  useEffect(() => {
    if (!isTestimonialAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => {
        const maxIndex = TESTIMONIALS.length - testimonialVisibleCount;
        if (prev >= maxIndex || prev < 0) {
          return 0; // wrap back to start
        }
        return prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialAutoPlaying, testimonialVisibleCount]);

  // Contact/Booking state variables
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingCourse, setBookingCourse] = useState('');
  const [bookingBand, setBookingBand] = useState('');
  const [bookingCountry, setBookingCountry] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // CRM OTP Verification states
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [testOtpHint, setTestOtpHint] = useState('');

  // Check for potentially malicious return URLs in query params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returnUrl = params.get('return_url') || params.get('redirect') || params.get('next');
    if (returnUrl) {
      const isRelative = returnUrl.startsWith('/') && !returnUrl.startsWith('//');
      let isSameOrigin = false;
      try {
        const parsed = new URL(returnUrl);
        isSameOrigin = parsed.origin === window.location.origin;
      } catch (e) {
        // Ignored
      }

      const isSafe = isRelative || isSameOrigin;
      if (!isSafe) {
        setBookingError('Insecure redirect URL blocked.');
      }
    }
  }, []);

  // Handle countdown timer for resending OTP
  useEffect(() => {
    let timer: any;
    if (otpCountdown > 0) {
      timer = setTimeout(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Simulator state variables
  const [selectedSample, setSelectedSample] = useState<UpgradeSample>(UPGRADE_SAMPLES[0]);
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState<{
    original: string;
    improved: string;
    feedback: string[];
    potentialScore: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Line-by-line interactive trainer correction states
  const [activeCorrectionId, setActiveCorrectionId] = useState<number | null>(null);

  // FAQ interactive state
  const [openedFaq, setOpenedFaq] = useState<number | null>(null);

  // Modal payment/enroll States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    type: string;
  } | null>(null);
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentTransaction, setPaymentTransaction] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Send OTP trigger
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!bookingName.trim()) {
      setBookingError('Full Name is required.');
      return;
    }
    if (!bookingEmail.trim() || !/\S+@\S+\.\S+/.test(bookingEmail)) {
      setBookingError('Please enter a valid email address.');
      return;
    }
    if (!bookingPhone.trim() || bookingPhone.length !== 10) {
      setBookingError('Please enter a valid 10-digit phone number (e.g. 17XXXXXXXX).');
      return;
    }
    if (!bookingCourse) {
      setBookingError('Please select a Target Course.');
      return;
    }
    if (!bookingBand.trim()) {
      setBookingError('Target Band is required.');
      return;
    }
    if (!bookingCountry) {
      setBookingError('Please select a Target Country.');
      return;
    }

    setBookingError('');
    setIsSendingOtp(true);

    const fullPhone = `+880${bookingPhone}`;
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
        if (data.otpCodeDebug) {
          setTestOtpHint(data.otpCodeDebug);
        } else {
          setTestOtpHint('');
        }
        setOtpCountdown(60);
      } else {
        setBookingError(data.error || 'ওটিপি পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('OTP send failed:', err);
      setBookingError('ওটিপি সার্ভারের সাথে কানেক্ট করতে সমস্যা হচ্ছে। অনুগ্রহ করে আপনার নেটওয়ার্ক চেক করুন।');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP & Save Lead
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      setBookingError('দয়া করে আপনার মোবাইলে পাঠানো ৬ ডিজিটের ওটিপি প্রবেশ করুন।');
      return;
    }
    setBookingError('');
    setIsVerifyingOtp(true);

    const fullPhone = `+880${bookingPhone}`;
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingName,
          phone: fullPhone,
          email: bookingEmail,
          course: bookingCourse,
          targetBand: bookingBand,
          targetCountry: bookingCountry,
          otp: otpCode,
          uid: 'ielts_crm_main_user'
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBookingSubmitted(true);
      } else {
        setBookingError(data.error || 'ভুল ওটিপি কোড! অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error('OTP validation failed:', err);
      setBookingError('ওটিপি ভেরিফিকেশন করার সময় ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Mock Essay line-by-line correction items
  const correctionPhrases = [
    {
      id: 1,
      phrase: "In my perspective, modern technology has a lot of advantages for children.",
      correction: "It is predominantly argued that technological integration yields numerous cognitive advantages for the younger demographic.",
      type: "Band 5.5 ➔ Band 7.5+ Upgrade",
      reason: "replaced generic 'has a lot of advantages' with academic lexical items like 'yields numerous cognitive advantages' and 'younger demographic'.",
      colorBg: "bg-red-50 hover:bg-red-100 border-red-300 text-red-900"
    },
    {
      id: 2,
      phrase: "But screen time can also make them lazy and bad at speaking.",
      correction: "However, excessive screen time can inadvertently engender sedentary lifestyles and impair verbal communication skills.",
      type: "Lexical & Grammar Range boost",
      reason: "Avoid beginning with 'But' in formal writing. Swapped 'lazy' to 'sedentary' and 'bad at speaking' to 'impair verbal communication skills'.",
      colorBg: "bg-orange-50 hover:bg-orange-100 border-orange-300 text-orange-900"
    },
    {
      id: 3,
      phrase: "So, parents must control these things carefully.",
      correction: "Therefore, crucial parental intervention is highly necessitated to moderate digital exposure.",
      type: "Formal Cohesion Upgrade",
      reason: "Modified the active command structure to an elegant passive construction with advanced linkers.",
      colorBg: "bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950"
    }
  ];

  // Manual input upgrading simulation
  const handleUpgradeCustom = () => {
    if (!customInput.trim() || customInput.length < 10) {
      alert("দয়া করে কমপক্ষে ১০ অক্ষরের একটি ইংরেজি ব্যাক্য লিখুন!");
      return;
    }
    setIsAnalyzing(true);
    
    // Simulate smart upgrades with a nice responsive delay
    setTimeout(() => {
      const inputLower = customInput.toLowerCase();
      let upgraded = customInput;
      let feedbackNotes: string[] = [];
      let predictedBand = "Band 5.5";

      // Simple interactive heuristics for demonstration
      if (inputLower.includes("very")) {
        upgraded = upgraded.replace(/very\s+good/gi, "highly beneficial");
        upgraded = upgraded.replace(/very\s+important/gi, "paramount / indispensable");
        upgraded = upgraded.replace(/very\s+bad/gi, "detrimental");
        upgraded = upgraded.replace(/very\s+big/gi, "monumental / immense");
        upgraded = upgraded.replace(/very/gi, "significantly");
        feedbackNotes.push("IELTS-এ 'Very' শব্দটি অতিরিক্ত ব্যবহার করা বর্জন করুন। এর পরিবর্তে 'indispensable', 'significantly' বা 'paramount' এর মত একাডেমিক শব্দ চয়ন করুন।");
      }

      if (inputLower.includes("think") || inputLower.includes("in my opinion")) {
        upgraded = upgraded.replace(/i think/gi, "It is widely perceived that");
        upgraded = upgraded.replace(/in my opinion/gi, "From an academic standpoint, it is argued that");
        feedbackNotes.push("ব্যক্তিগত 'I think' বা 'In my opinion' পরিহার করে 'It is widely acknowledged that' বা passive phrase ব্যবহার করলে ব্যান্ড স্কোর বৃদ্ধি পায়।");
      }

      if (inputLower.includes("people")) {
        upgraded = upgraded.replace(/people/gi, "individuals / general public");
        feedbackNotes.push("সাধারণ 'people' শব্দটির পুনরাবৃত্তি না করে 'individuals' বা 'citizens' ব্যবহার করুন।");
      }

      if (inputLower.includes("get")) {
        upgraded = upgraded.replace(/get/gi, "acquire / attain / secure");
        feedbackNotes.push("সাধারণ ক্রিয়াপদ 'get' এর বদলে 'acquire knowledge' বা 'secure job' ব্যবহার করুন।");
      }

      // Default backup replacement if no triggers met
      if (feedbackNotes.length === 0) {
        upgraded = "Sophisticated Translation: " + customInput.replace(/\b(good|bad|important|big)\b/gi, (match) => {
          if (match.toLowerCase() === 'good') return 'advantageous';
          if (match.toLowerCase() === 'bad') return 'unfavorable';
          if (match.toLowerCase() === 'important') return 'pivotal';
          if (match.toLowerCase() === 'big') return 'substantial';
          return match;
        }) + " (Syntactic variation applied)";
        feedbackNotes.push("বাক্যের স্ট্রাকচারে Complex বা Compound ক্লজ ব্যবহার করুন এবং একাডেমিক সিনোনিমস দিয়ে সাজান।");
        predictedBand = "Band 7.0+ (Estimated after upgrade)";
      } else {
        predictedBand = "Band 7.5 (Estimated after upgrade)";
      }

      setCustomResult({
        original: customInput,
        improved: upgraded,
        feedback: feedbackNotes,
        potentialScore: predictedBand
      });
      setIsAnalyzing(false);
    }, 1000);
  };

  const openPayment = (planName: string, planPrice: string, planType: string) => {
    setSelectedPlan({ name: planName, price: planPrice, type: planType });
    setPaymentCompleted(false);
    setPaymentPhone('');
    setPaymentTransaction('');
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    try {
      if (!paymentPhone || !paymentPhone.trim()) {
        throw new Error("দয়া করে আপনার পেমেন্টকৃত মোবাইল নম্বর প্রদান করুন!");
      }
      if (!paymentTransaction || !paymentTransaction.trim()) {
        throw new Error("দয়া করে আপনার পেমেন্ট ট্রানজেকশন আইডি (TrxID) প্রদান করুন!");
      }
      
      setIsAnalyzing(true);
      
      const payload = {
        phone: paymentPhone.trim(),
        transactionId: paymentTransaction.toUpperCase().trim(),
        planName: selectedPlan?.name || "Premium Live Batch",
        planPrice: selectedPlan?.price || "৳ ২,৯৯৯",
        studentName: bookingName.trim() || `Student (${paymentPhone})`,
        studentEmail: bookingEmail.trim() || "N/A"
      };

      const response = await fetch('/api/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPaymentCompleted(true);
      } else {
        throw new Error(data.error || 'পেমেন্ট সাবমিট করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch (err: any) {
      setBookingError(err.message || 'পেমেন্ট সম্পন্ন করতে সমস্যা হয়েছে।');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (showAdminView) {
    return <AdminPanel onClose={() => setShowAdminView(false)} />;
  }

  return (
    <div className="bg-bg-light text-slate-800 antialiased font-sans min-h-screen scroll-smooth">
      
      {/* Dynamic Promotion Banner */}
      <div id="promo-banner" className="bg-accent-red text-white py-2 px-4 text-center text-xs font-semibold tracking-wide flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 overflow-hidden min-h-[46px] md:min-h-[40px] relative z-50">
        <div className="flex items-center gap-1.5 justify-center">
          <Sparkles className="w-4 h-4 animate-pulse shrink-0 text-accent-gold" />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentBannerIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex items-center gap-1 flex-wrap justify-center text-xs md:text-sm"
            >
              <span>{bannerTexts[currentBannerIndex].text}</span>
              <a href="#pricing" className="underline hover:text-accent-gold ml-1.5 transition font-extrabold whitespace-nowrap text-accent-gold">
                {bannerTexts[currentBannerIndex].cta}
              </a>
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Beautiful Countdown Urgency Block */}
        <div className="flex items-center gap-1.5 text-xs text-white shrink-0 bg-black/20 px-3 py-1 rounded-full border border-white/10 select-none">
          <Clock className="w-3.5 h-3.5 text-accent-gold shrink-0" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-200">অফারটি শেষ হতে বাকি:</span>
          
          <div className="flex items-center gap-1 font-mono text-xs md:text-sm font-black">
            <div className="flex flex-col items-center">
              <span className="bg-slate-950 px-1.5 py-0.5 rounded text-accent-gold shadow-sm font-extrabold min-w-[20px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="text-white animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-slate-950 px-1.5 py-0.5 rounded text-accent-gold shadow-sm font-extrabold min-w-[20px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="text-white animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-slate-950 px-1.5 py-0.5 rounded text-accent-gold shadow-sm font-extrabold min-w-[20px] text-center text-emerald-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header id="main-header" className="bg-navy-primary text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-accent-red p-1.5 rounded-lg text-white">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
              IELTS <span className="text-accent-red">REVOLUTION</span>
            </span>
          </div>

          <nav className="hidden lg:flex space-x-8 text-sm font-medium">
            <a href="#features" className="hover:text-accent-red transition-all duration-200">ফিচারসমূহ</a>
            <a href="#upgrade-tool" className="text-accent-gold hover:text-white flex items-center gap-1 transition-all">
              <Zap className="w-3.5 h-3.5 text-accent-gold" /> রাইটিং আপগ্রেডার
            </a>
            <a href="#curriculum" className="hover:text-accent-red transition-all duration-200">কারিকুলাম</a>
            <a href="#eval-preview" className="hover:text-accent-red transition-all duration-200">লাইভ ইভ্যালুয়েশন</a>
            <a href="#pricing" className="hover:text-accent-red transition-all duration-200">ফি এবং এডমিশন</a>
            <a href="#faq" className="hover:text-accent-red transition-all duration-200">FAQ</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a 
              href="#pricing" 
              className="bg-accent-red hover:bg-red-700 text-white px-4 md:px-5 py-2 rounded-md font-bold text-xs md:text-sm transition shadow-lg shrink-0"
              id="header-enroll-btn"
            >
              ভর্তি হোন 
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero-section" className="bg-gradient-to-br from-navy-primary to-navy-secondary text-white pt-8 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-16 relative overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-accent-gold/20 text-accent-gold border border-accent-gold/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-accent-gold" /> IELTS Writing Dedicated Batch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-sans tracking-tight">
              IELTS Writing-এ <span className="text-accent-gold">Band 7.0+</span> পাওয়ার বাস্তবমুখী গাইডলাইন
            </h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
              অনেকেরই লিসেনিং বা রিডিং-এ ভালো স্কোর আসলেও রাইটিং মডিউলে এসে আটকে যান। সঠিক গ্রামার, রিচ ভোকাবুলারি এবং লজিক্যাল আইডিয়া ডেভেলপমেন্টের অভাব দূর করতেই আমাদের এই ডেডিকেটেড রাইটিং কোর্স।
            </p>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-3 gap-4 bg-navy-secondary/50 p-4 rounded-xl border border-white/10 shrink-0">
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-extrabold text-accent-gold">১০০%</span>
                <span className="text-xs text-slate-400">লাইভ ইভ্যালুয়েশন</span>
              </div>
              <div className="text-center border-x border-white/10 px-2">
                <span className="block text-2xl md:text-3xl font-extrabold text-accent-red">৪.৮+</span>
                <span className="text-xs text-slate-400">কোর্স রেটিং</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-extrabold text-white">৩০০০+</span>
                <span className="text-xs text-slate-400">সন্তুষ্ট শিক্ষার্থী</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#pricing" 
                className="bg-accent-gold hover:bg-yellow-600 text-navy-primary text-center px-8 py-4 rounded-lg font-bold text-base md:text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                id="hero-cta-enroll"
              >
                আজই এনরোল করুন <ArrowRight className="w-5 h-5 text-navy-primary" />
              </a>
              <a 
                href="#curriculum" 
                className="border border-white/30 hover:bg-white/10 text-white text-center px-8 py-4 rounded-lg font-semibold text-base md:text-lg transition-all"
                id="hero-cta-outline"
              >
                কোর্স আউটলাইন দেখুন
              </a>
            </div>


          </div>

          {/* Hero Form Right */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl relative border-t-8 border-accent-red" id="booking-card">
              
              {!bookingSubmitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-navy-primary flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent-red" /> ফ্রি ওরিয়েন্টেশন বুক করুন
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      {isOtpSent 
                        ? "আপনার মোবাইল ওটিপি যাচাইকরণ সম্পন্ন করুন।" 
                        : "নিচের ফর্মটি পূরণ করে পরবর্তী ফ্রি লাইভ ক্লাসের স্পেশাল স্লট এখনই বুক করুন।"}
                    </p>
                  </div>
                  
                  {bookingError && (
                    <div className="bg-red-50 border-l-4 border-accent-red p-3 mb-4 rounded text-xs text-accent-red flex items-center gap-2 animate-bounce">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  {!isOtpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4 text-left">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-left">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="e.g. John Doe" 
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-slate-800 placeholder-slate-400 font-medium text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-left">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="john@example.com" 
                          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-slate-800 placeholder-slate-400 font-medium text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-left">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Phone className="w-4 h-4 mr-1.5 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-700 ml-1">+880</span>
                          </div>
                          <input 
                            type="tel" 
                            required
                            value={bookingPhone}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '');
                              if (val.startsWith('0')) {
                                val = val.substring(1);
                              }
                              if (val.length <= 10) {
                                setBookingPhone(val);
                              }
                            }}
                            placeholder="17XXXXXXXX" 
                            className="w-full pl-20 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-slate-800 placeholder-slate-400 font-medium text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-left">
                            Target Course <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              required
                              value={bookingCourse}
                              onChange={(e) => setBookingCourse(e.target.value)}
                              className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-slate-600 font-medium text-sm appearance-none"
                            >
                              <option value="" disabled>Select Course</option>
                              <option value="IELTS Academic">IELTS Academic</option>
                              <option value="IELTS General">IELTS General</option>
                              <option value="Spoken English">Spoken English</option>
                              <option value="Writing & Grammar">Writing & Grammar</option>
                              <option value="Reading & Vocabulary">Reading & Vocabulary</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                              <ChevronDown className="w-4 h-4 text-slate-500" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-left">
                            Target Band <span className="text-red-500">*</span>
                          </label>
                          <input 
                            type="text" 
                            required
                            value={bookingBand}
                            onChange={(e) => setBookingBand(e.target.value)}
                            placeholder="e.g. 7.5" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-slate-800 placeholder-slate-400 font-medium text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-left">
                          Target Country <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Globe className="w-4 h-4 text-slate-500" />
                          </div>
                          <select
                            required
                            value={bookingCountry}
                            onChange={(e) => setBookingCountry(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-400 transition-all text-slate-600 font-medium text-sm appearance-none"
                          >
                            <option value="" disabled>Select target destination</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={isSendingOtp}
                          className="w-full bg-[#e2e8f0] hover:bg-[#cbd5e1] text-slate-700 disabled:bg-slate-200 disabled:text-slate-400 py-3.5 rounded-lg font-bold text-sm md:text-base border border-slate-300 hover:border-slate-400 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                        >
                          {isSendingOtp ? (
                            <>
                              <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 text-slate-600" />
                              <span>Send Verification Code & Submit</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 flex justify-between items-center mb-2">
                        <div>
                          <p className="font-semibold text-slate-700">মোবাইল নাম্বার:</p>
                          <p className="text-navy-primary font-bold">{bookingPhone}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => {
                            setIsOtpSent(false);
                            setBookingError('');
                          }}
                          className="text-accent-red hover:underline font-bold text-[11px]"
                        >
                          পরিবর্তন করুন
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-600 mb-1 flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" /> ওটিপি কোড (৬ ডিজিট)
                        </label>
                        <input 
                          type="text" 
                          required
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="১২৩৪৫৬" 
                          className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red transition-all"
                        />
                      </div>

                      {testOtpHint && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-2.5 rounded text-[11px] text-amber-900 leading-relaxed space-y-1">
                          <p className="font-bold flex items-center gap-1 text-amber-800">
                            <span>🧪 টেস্ট ডেভলপমেন্ট মোড সচল:</span>
                          </p>
                          <p>
                            আপনার সাবমিট করা ওটিপি কোড: <strong className="bg-amber-200 px-1 py-0.5 rounded text-navy-primary font-mono text-xs">{testOtpHint}</strong>
                          </p>
                          <p className="text-[10px] text-slate-400">বিকাশ/নগদ এসএমএস গেটওয়ে সংযুক্ত নেই, সরাসরি উপরোক্ত কোডটি টাইপ করে ভেরিফিকেশন পরীক্ষা করুন।</p>
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isVerifyingOtp}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-lg font-bold text-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                      >
                        {isVerifyingOtp ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>কোড যাচাই করা হচ্ছে...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5" />
                            <span>ভেরিফাই ও স্লট বুক করুন</span>
                          </>
                        )}
                      </button>

                      <div className="text-center pt-2">
                        {otpCountdown > 0 ? (
                          <span className="text-xs text-slate-400 font-medium">
                            {otpCountdown} সেকেন্ড পর পুনরায় ওটিপি পাঠানো যাবে
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            className="text-xs text-accent-red hover:underline font-bold"
                          >
                            পুনরায় ওটিপি পাঠান ➔
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                  <p className="text-center text-slate-400 text-[10px] mt-4">🔒 আপনার ব্যক্তিগত তথ্য সম্পূর্ণ নিরাপদ থাকবে।</p>
                </>
              ) : (
                <div className="text-center py-12 space-y-6" id="booking-success-container">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">অভিনন্দন, {bookingName}!</h3>
                    <p className="text-emerald-700 font-semibold text-sm">আপনার ফ্রি ওরিয়েন্টেশন ক্লাসের স্লটটি সফলভাবে বুক করা হয়েছে।</p>
                    <p className="text-slate-500 text-xs px-4">আমরা আগামী ২৪ ঘণ্টার মধ্যে আপনার দেয়া মোবাইল নাম্বার <strong className="text-slate-800">{bookingPhone}</strong> অথবা ইমেইলে ক্লাসের Zoom লিংক এবং ইনভাইটেশন পাঠিয়ে দেব।</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs space-y-2">
                    <p className="font-bold text-navy-primary flex items-center gap-1.5"><Calendar className="w-4 h-4 text-accent-red" /> ওরিয়েন্টেশন সিডিউল:</p>
                    <p className="text-slate-600">📅 শুক্রবার রাত ৮:৩০ টা (বাংলাদেশ সময়)</p>
                    <p className="text-slate-600">🔑 স্লট কোড: <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-navy-secondary font-bold">REVOLUTION-WRITE-2026</span></p>
                  </div>

                  <button 
                    onClick={() => setBookingSubmitted(false)}
                    className="text-accent-red font-semibold hover:underline text-xs flex items-center justify-center gap-1 mx-auto"
                  >
                    আরেকটি বুকিং করতে চান? এখানে ক্লিক করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Brand New: Interactive Writing Band Upgrade Masterclass Simulator */}
      <section id="upgrade-tool" className="py-16 bg-navy-secondary text-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-accent-gold font-bold text-xs uppercase tracking-widest bg-accent-gold/10 px-3 py-1 rounded-full border border-accent-gold/20 flex items-center gap-1 w-max mx-auto">
              <Zap className="w-3 h-3 text-accent-gold" /> Practice & Upgrade Simulator
            </span>
            <h2 className="text-2xl md:text-4xl font-bold">IELTS Writing Upgrader</h2>
            <p className="text-slate-300 text-sm md:text-base">
              নিচে যেকোনো একটি মডিউল বা টপিক সিলেক্ট করে দেখুন কিভাবে সাধারণ বাক্যগুলোকে প্রফেশনাল এবং হাই-স্কোরিং রাইটিং-এ পরিবর্তন করা যায়।
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Topic Select Button Column */}
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">টপিক নির্বাচন করুন:</p>
              {UPGRADE_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setSelectedSample(sample);
                    setCustomResult(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    selectedSample.id === sample.id 
                    ? 'bg-accent-red border-accent-red text-white shadow-lg translate-x-2'
                    : 'bg-navy-primary/60 border-slate-750 text-slate-300 hover:bg-navy-primary hover:text-white'
                  }`}
                  id={`sample-btn-${sample.id}`}
                >
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/75 font-semibold uppercase">{sample.topic}</p>
                    <p className="font-bold text-sm sm:text-base">{sample.title}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 opacity-70 ${selectedSample.id === sample.id ? 'translate-x-1' : ''}`} />
                </button>
              ))}

              {/* Try your own sentence quick box */}
              <div className="bg-navy-primary/40 p-5 rounded-2xl border border-white/5 space-y-3 mt-6">
                <p className="text-xs font-bold text-accent-gold flex items-center gap-1">
                  <Edit3 className="w-4 h-4 text-accent-gold" /> নিজের রাইটিং পরীক্ষা করুন:
                </p>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="যেমন: In my opinion, technology is good because it connects people..."
                  rows={3}
                  className="w-full bg-navy-secondary text-slate-200 text-xs p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-gold border border-white/10"
                ></textarea>
                <button
                  onClick={handleUpgradeCustom}
                  className="w-full bg-accent-gold hover:bg-yellow-600 text-navy-primary font-bold text-xs py-2.5 rounded-lg transition-all"
                  id="upgrade-button"
                >
                  আইইএলটিএস আপগ্রেড চেক করুন
                </button>
              </div>
            </div>

            {/* Comparison Playground Column */}
            <div className="lg:col-span-8 bg-navy-primary rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
              
              {/* If custom result exists, show analysis */}
              {customResult ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-navy-secondary p-3 rounded-lg border border-white/5">
                    <span className="text-xs text-slate-300">আপনার ইনপুট ফলাফল বিশ্লেষণ:</span>
                    <button 
                      onClick={() => setCustomResult(null)} 
                      className="text-xs text-accent-red hover:underline"
                    >
                      মূল এক্সাম্পল দেখুন ➔
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-950/20 p-4 rounded-xl border border-accent-red/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-accent-red bg-accent-red/10 px-2 py-0.5 rounded">আপনার বাক্য</span>
                        <span className="text-xs text-slate-400">Band 5.0 - 5.5 (সাধারণ)</span>
                      </div>
                      <p className="text-slate-300 text-sm italic font-mono">"{customResult.original}"</p>
                    </div>

                    <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">প্রেশেশনাল ব্যান্ড ৭.৫+ বাক্য</span>
                        <span className="text-xs text-accent-gold font-bold">{customResult.potentialScore}</span>
                      </div>
                      <p className="text-emerald-200 text-sm font-semibold">"{customResult.improved}"</p>
                    </div>
                  </div>

                  <div className="space-y-2 bg-navy-secondary/60 p-5 rounded-xl border border-white/5">
                    <p className="text-sm font-bold text-accent-gold flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-accent-gold" /> স্কোর বুস্টার টিপস ও বিশ্লেষণ:
                    </p>
                    <ul className="text-xs text-slate-300 space-y-2.5 list-disc list-inside">
                      {customResult.feedback.map((note, idx) => (
                        <li key={idx} className="leading-relaxed">{note}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center p-3 bg-accent-red/5 rounded-lg border border-accent-red/10">
                    <p className="text-xs text-slate-300">এরকম হাজারো অ্যাডভান্সড পরিবর্তন এবং ওয়ান-টু-ওয়ান ফিডব্যাক পাবেন আমাদের কোর্সে।</p>
                  </div>
                </div>
              ) : (
                /* Default selected prompt card details */
                <div className="space-y-6">
                  <div>
                    <span className="text-xs bg-accent-red/20 text-accent-red border border-accent-red/30 px-2 py-0.5 rounded font-mono uppercase">
                      Essay Topic: {selectedSample.topic}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2">"{selectedSample.prompt}"</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pb-2">
                    
                    {/* Average Output */}
                    <div className="bg-navy-secondary/60 p-5 rounded-xl border border-white/5 relative group hover:border-red-500/30 transition-all">
                      <span className="absolute -top-3 left-4 bg-red-950 text-accent-red text-[10px] uppercase font-bold border border-accent-red/30 px-2 py-0.5 rounded-full">
                        Typical Mistakes
                      </span>
                      <div className="space-y-3 pt-2">
                        <p className="text-sm text-slate-300 italic">"{selectedSample.badText}"</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400">ব্যবহৃত শব্দাবলী:</span>
                          <span className="text-accent-red font-semibold">very, big, bad, only</span>
                        </div>
                        <div className="bg-accent-red/10 py-1.5 px-3 rounded text-[11px] text-accent-red font-bold w-max">
                          📊 আনুমানিক স্কোর: {selectedSample.scoreBad}
                        </div>
                      </div>
                    </div>

                    {/* Band 7.5+ Masterclass Output */}
                    <div className="bg-navy-secondary/80 p-5 rounded-xl border border-accent-gold/20 relative group hover:border-accent-gold/40 transition-all">
                      <span className="absolute -top-3 left-4 bg-yellow-950 text-accent-gold text-[10px] uppercase font-bold border border-accent-gold/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> High-Band Solution
                      </span>
                      <div className="space-y-3 pt-2">
                        <p className="text-sm text-emerald-200 font-medium leading-relaxed">"{selectedSample.goodText}"</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400">একাডেমিক লেক্সিকাল:</span>
                          <span className="text-accent-gold font-semibold">anthropogenic, paramount, restoration</span>
                        </div>
                        <div className="bg-accent-gold/15 py-1.5 px-3 rounded text-[11px] text-accent-gold font-bold w-max">
                          🏆 আনুমানিক স্কোর: {selectedSample.scoreGood}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Criteria Analysis Cards inside simulator */}
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">কিভাবে ব্যান্ড ৮.০ উত্তর তৈরি করা হলো?</p>
                    
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-navy-secondary/40 p-4 rounded-xl border border-white/5 space-y-1">
                        <p className="text-xs font-bold text-accent-gold">Vocabulary (শব্দভান্ডার)</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{selectedSample.vocabularyTip}</p>
                      </div>
                      <div className="bg-navy-secondary/40 p-4 rounded-xl border border-white/5 space-y-1">
                        <p className="text-xs font-bold text-accent-gold">Grammar (ব্যাকরণ পরিসীমা)</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{selectedSample.grammarTip}</p>
                      </div>
                      <div className="bg-navy-secondary/40 p-4 rounded-xl border border-white/5 space-y-1">
                        <p className="text-xs font-bold text-accent-gold">Cohesion (ধারাবাহিকতা)</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{selectedSample.coherenceTip}</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Core Problems We Solve Section */}
      <section id="features" className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent-red font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Why IELTS Revolution?
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-navy-primary mt-3">IELTS Writing Module-এ আপনার দুর্বলতা কোথায়?</h2>
            <div className="h-1.5 w-20 bg-accent-red mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-600 mt-4 text-sm md:text-base">
              আমরা কোনো সাধারণ বা গতানুগতিক মুখস্থ টেমপ্লেট শিখাই না। বরং IELTS Band ডিসক্রিপ্টরের অফিশিয়াল ৪টি মানদণ্ড নিখুঁতভাবে মেনে রাইটিং ইমপ্রুভ করতে সাহায্য করি।
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Problem Card 1 */}
            <div className="bg-bg-light p-8 rounded-2xl border-t-4 border-accent-red hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl mb-5 group-hover:bg-accent-red transition-colors duration-300">
                ✍️
              </div>
              <h3 className="text-xl font-bold text-navy-primary mb-3">Task Response & Achievement</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                প্রশ্নের মূল দাবি সঠিকভাবে ধরতে না পারা এবং সম্পূর্ণ অপ্রাসঙ্গিক উত্তর লেখার কারণে অনেকেই ভালো স্কোর পান না। আমরা প্রতিটি প্রশ্নের সঠিক স্ট্রাকচার বিশ্লেষণ এবং মগ আউটলাইন শেখাই।
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-500 font-semibold border-t border-slate-200/50 pt-4">
                <li className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> প্রশ্নের ৩-ধাপের ব্যবচ্ছেদ</li>
                <li className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> অপ্রাসঙ্গিক ইনফরমেশন ফিল্ড রিমুভাল</li>
              </ul>
            </div>

            {/* Problem Card 2 */}
            <div className="bg-bg-light p-8 rounded-2xl border-t-4 border-accent-red hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl mb-5 group-hover:bg-accent-red transition-colors duration-300">
                🔗
              </div>
              <h3 className="text-xl font-bold text-navy-primary mb-3">Coherence & Cohesion</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                আপনার ব্রেইনস্টর্মিং আইডিয়াগুলোর মধ্যে প্রাকৃতিক সংযোগ বা লজিক ব্যবহারের অভাব। কিভাবে একটি সেন্টেন্স থেকে আরেকটি সেন্টেন্সে ট্রানজিশনার্স লিঙ্ক ব্যবহার করতে হয় তা শেখানো হবে।
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-500 font-semibold border-t border-slate-200/50 pt-4">
                <li className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> প্যারাগ্রাফিং লজিক্যাল টেমপ্লটিং</li>
                <li className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> ২৫+ ওভারঅল ট্রানজিশনার্স ব্যবহার</li>
              </ul>
            </div>

            {/* Problem Card 3 */}
            <div className="bg-bg-light p-8 rounded-2xl border-t-4 border-accent-red hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl mb-5 group-hover:bg-accent-red transition-colors duration-300">
                📚
              </div>
              <h3 className="text-xl font-bold text-navy-primary mb-3">Lexical Resource & Grammar</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                কঠিন কঠিন অপ্রচলিত শব্দ ব্যবহার না করে কিভাবে ডোমেইন সঠিক Collocation এবং বৈচিত্র্যময় Sentence Structure (Complex & Compound) ব্যবহার করতে হয় তার চমৎকার রূপরেখা।
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-500 font-semibold border-t border-slate-200/50 pt-4">
                <li className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> ডোমেইন ভিত্তিক Collocation তালিকা</li>
                <li className="flex items-center gap-1.5 text-emerald-600"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> ১২ ধরনের জটিল বাক্য গঠন ফর্মুলা</li>
              </ul>
            </div>

          </div>

          {/* Quick interactive callout */}
          <div className="mt-12 bg-navy-primary text-white p-6 md:p-8 rounded-2xl text-center md:text-left md:flex justify-between items-center gap-6 border-b-4 border-accent-gold shadow-lg">
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-bold text-white">আপনি কি আপনার বর্তমান রাইটিং ব্যান্ড লেভেল জানতে চান?</p>
              <p className="text-xs text-slate-300">ভর্তি হওয়ার পর আপনার প্রথম লেখায় পাচ্ছেন স্পেশাল ওয়ান-টু-ওয়ান ব্যান্ড এসেসমেন্ট ফ্রিতে!</p>
            </div>
            <a 
              href="#pricing" 
              className="mt-4 md:mt-0 inline-block bg-accent-gold hover:bg-yellow-600 text-navy-primary font-bold px-6 py-3 rounded-lg text-sm transition-all"
            >
              এসেসমেন্ট বুক করুন
            </a>
          </div>

        </div>
      </section>

      {/* Brand New: Interactive Screen Evaluation Sandbox (Hover Inspector) */}
      <section id="eval-preview" className="py-16 bg-bg-light border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs bg-navy-primary text-white font-bold uppercase tracking-wider px-3 py-1 rounded">
              Interactive Live Correction Demo 💻
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-navy-primary mt-3">Line-by-line ট্রেইনার কারেকশন পোর্টাল</h2>
            <div className="h-1 w-16 bg-accent-red mx-auto mt-3"></div>
            <p className="text-slate-600 text-xs md:text-sm mt-3">
              আমাদের শিক্ষার্থীরা কিভাবে স্ক্রিপ্ট সাবমিট করে এবং কিভাবে ট্রেইনার প্রতিটি ভুল সংশোধন করে তার একটি ডেমো ইন্টারঅ্যাক্টিভ প্রিভিউ নিচে দেওয়া হলো। ভুল লাল বাক্যে ক্লিক করুন।
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Student Essay Screen Rendering */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 text-xs">
                <span className="text-slate-500">Student Submission: <strong className="text-navy-primary">Raihan Chowdhury</strong></span>
                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">Task 2 Draft</span>
              </div>
              
              <div className="space-y-4 text-sm md:text-base leading-relaxed text-slate-700 font-sans">
                <p className="text-slate-400 text-xs font-mono uppercase">// CLICK ON THE HIGHLIGHTED SENTENCES TO REVEAL FEEDBACK NOTES</p>
                
                {/* Highlighted correction interactive zones */}
                {correctionPhrases.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveCorrectionId(activeCorrectionId === item.id ? null : item.id)}
                    className={`p-3.5 rounded-lg border-l-4 cursor-pointer transition-all duration-200 ${
                      activeCorrectionId === item.id 
                      ? 'bg-accent-gold/10 border-accent-gold shadow-md scale-[1.01]' 
                      : item.colorBg
                    }`}
                  >
                    <p className="line-through text-xs text-slate-500 mb-0.5">Original Draft:</p>
                    <p className="font-medium text-xs sm:text-sm">{item.phrase}</p>
                    <div className="mt-2 flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 italic">Click to view corrected version ➔</span>
                      <span className="bg-navy-primary text-white px-1.5 py-0.5 rounded uppercase font-bold text-[8px] tracking-wide font-mono">Trainer Note</span>
                    </div>
                  </div>
                ))}

                <p className="text-slate-600 text-xs pt-4 border-t border-slate-100">
                  ...Consequently, excessive reliance upon machines could result in adverse physical implications if outdoor play is completely restricted...
                </p>
              </div>
            </div>

            {/* Dynamic Trainer Feedback Details panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-navy-primary text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full pointer-events-none"></div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-accent-gold" /> ট্রেইনার ফিডব্যাক আউটপুট
                </h3>
                <p className="text-slate-300 text-xs mb-4">ভুলটির ওপর ক্লিক করলে এখানে Line-by-line সংশোধন এবং স্কোর বৃদ্ধি টিপস দেখা যাবে।</p>
                
                {activeCorrectionId !== null ? (
                  <div className="space-y-4 animate-fadeIn">
                    {(() => {
                      const item = correctionPhrases.find(p => p.id === activeCorrectionId);
                      if (!item) return null;
                      return (
                        <>
                          <div className="bg-navy-secondary p-3 rounded-lg border border-white/10 space-y-1">
                            <span className="text-[10px] bg-accent-gold text-navy-primary font-bold px-1.5 py-0.5 rounded uppercase font-mono">{item.type}</span>
                            <p className="text-xs text-slate-400 mt-2">Correction Output:</p>
                            <p className="text-emerald-300 text-sm font-semibold italic">"{item.correction}"</p>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-accent-gold flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5 text-accent-gold" /> সংশোধনীর মূল কারণ:
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed">{item.reason}</p>
                          </div>

                          <div className="border-t border-white/10 pt-3">
                            <p className="text-[11px] text-slate-400">🔥 এই ছোট ছোট ভুলগুলো এড়ালেই রাইটিং স্কোর ৫.৫ থেকে সহেজই ৭.৫+ এ উন্নীত হবে।</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 space-y-3">
                    <PenTool className="w-12 h-12 text-slate-600 mx-auto" />
                    <p className="text-xs">বাম পাশের রিয়েল-টাইম স্ক্রিপ্ট সংশোধনী বক্সে যেকোনো ভুলের ওপর ক্লিক করে ট্রেইনারের প্রিমিয়াম মেথডলজি দেখুন।</p>
                  </div>
                )}
              </div>

              {/* Standard Score Evaluation Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-slate-800 space-y-3 shadow-md">
                <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">আমাদের রাইটিং পোর্টালে যা পাচ্ছেন:</p>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-red shrink-0" /> Line-by-line ভুল সংশোধন ও সঠিক সমাধান</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-red shrink-0" /> অফিসিয়াল ৪টি Band ক্রাইটেরিয়া আলাদাভাবে স্কোরিং</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-red shrink-0" /> ভোকাবুলারি রিচনেস ও গ্রামার আপগ্রেডেশন চার্ট</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-red shrink-0" /> ওয়ান-টু-ওয়ান সরাসরি কনসালটেশন ক্লিয়ারিং ক্লাসেস</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Course Curriculum Section */}
      <section id="curriculum" className="py-16 bg-bg-light">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent-gold font-bold text-xs uppercase tracking-wider bg-navy-primary text-white px-3 py-1 rounded">
              Comprehensive Outlines 📖
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-navy-primary mt-3">কোর্স কারিকুলাম ও মডিউল</h2>
            <div className="h-1.5 w-20 bg-accent-red mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-600 mt-4 text-sm md:text-base">
              Task 1 এবং Task 2-এর প্রতিটি টপিকের জন্য আলাদা এবং অত্যন্ত বিস্তারিত ক্লাস মডিউল যা আপনাকে একদম রুট থেকে মাস্টার লেভেলে নিয়ে যাবে।
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* Module 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-accent-red bg-red-50 border border-red-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Module 01
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-navy-primary">Writing Task 1 (Academic & General Letter)</h3>
                  <p className="text-slate-500 text-xs">আইইএলটিএস রাইটিং টাস্ক-১ এর জন্য আমাদের ডেডিকেটেড সেশনসমূহ।</p>
                  
                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span><strong>Academic Task 1:</strong> Line Graph, Bar Chart, Pie Chart, Table, Map এবং Process ডায়াগ্রামের বিস্তারিত প্যারাগ্রাফিং ও কি-ফিচারস এক্সট্রাকশন টেকনিক্স।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span><strong>General Training letters:</strong> Formal, Semi-formal এবং Informal লেটার রাইটিং-এর স্ট্যান্ডার্ড ফরমেট এবং স্টাইলিশ বুলেটিং গাইড।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span><strong>Band 7+ Vocabulary:</strong> নির্দিষ্ট চার্ট এবং ডেটা গ্রুপিং অনুযায়ী প্রয়োজনীয় শব্দ চয়ন এবং রেঞ্জ।</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-accent-red bg-red-50 border border-red-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Module 02
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-navy-primary">Writing Task 2 (Essay Mastery - ৫ টাইপ)</h3>
                  <p className="text-slate-500 text-xs">এটির মাধ্যমে আপনারTask 2 এসএ রাইটিং মডিউলকে পূর্ণাঙ্গ বুস্ট করুন।</p>
                  
                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span><strong>৫ ধরনের এসে (Essay) টাইপ বিশ্লেষণ:</strong> Agree/Disagree, Discussion, Advantages/Disadvantages, Solution, এবং Double Questions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span><strong>৩-স্টেপ আইডিয়া জেনারেটিং মেথড:</strong> ব্রেইনস্টর্মিং ও লজিক্যাল প্যারাগ্রাফিং টেকনিক যেখানে ১০ মিনিটে যেকোনো কঠিন টপিকে ধারণা পাবেন।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span><strong>আউটলাইন ও থিসিস বাক্য তৈরি:</strong> পরীক্ষককে শুরুতেই চমকে দেয়ার মত স্ট্রাকচার্ড ভূমিকা এবং কনক্লুশন ফর্মুলা।</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-accent-red bg-red-50 border border-red-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Module 03
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-navy-primary">Personalized Evaluation & Mock Feedback</h3>
                  <p className="text-slate-500 text-xs">আপনার লেখার ওপরে সরাসরি কাজের ভুলগুলো শোধরানোর ডেডিকেটেড সেশন।</p>
                  
                  <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span>লাইভ ক্লাসের পাশাপাশি আপনার প্রতিটি লেখার ওপর আনুমানিক IELTS Band স্কোরসহ বিস্তারিত সংশোধন ও পিডিএফ রিপোর্ট প্রদান।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span>ভুলগুলো শুধরে নিয়ে কীভাবে আবার রি-রাইট করবেন সে বিষয়ে ওয়ান-টু-ওয়ান সরাসরি জুম ডাউট সলভিং সেশন।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-red font-bold mt-0.5">•</span>
                      <span>রিয়েল-টাইম মক পরীক্ষার জন্য অফিসিয়াল আইইএলটিএস আনসার শিটের অনুরূপ ইন্টারফেস টেমপ্লেট ইভ্যালুয়েশন।</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Students Testimonials Carousel/List */}
      <section className="py-16 bg-navy-primary text-white overflow-hidden relative" id="testimonials">
        <div className="container mx-auto px-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="text-left max-w-2xl">
              <span className="text-accent-gold text-xs uppercase font-bold tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full inline-flex items-center gap-1">
                ⭐ Succces Stories 
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mt-3">শিক্ষার্থীদের মতামত ও সাফল্য ক্যানভাস</h2>
              <div className="h-1 w-16 bg-accent-red mt-4 rounded-full"></div>
              <p className="text-slate-300 text-xs md:text-sm mt-3">
                আইইএলটিএস রিভোলিউশন কোর্সের মাধ্যমে যারা পূর্বে অনেক আটকে থেকে পরে চমৎকার ভালো রাইটিং স্কোর করতে পেরেছেন।
              </p>
            </div>
            
            {/* Navigation Slider Controls */}
            <div className="flex items-center gap-2 self-start md:self-end">
              <button 
                onClick={() => {
                  setCurrentTestimonialIndex((prev) => {
                    const maxIndex = TESTIMONIALS.length - testimonialVisibleCount;
                    if (prev <= 0) return maxIndex;
                    return prev - 1;
                  });
                }}
                className="p-2 rounded-xl bg-navy-secondary border border-white/5 text-slate-300 hover:text-white hover:border-white/20 transition active:scale-95 cursor-pointer flex items-center justify-center shadow-md focus:outline-none"
                title="পূর্ববর্তী রিভিউ"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="text-slate-500 text-xs font-mono select-none px-2">
                {currentTestimonialIndex + 1} / {TESTIMONIALS.length - testimonialVisibleCount + 1}
              </span>

              <button 
                onClick={() => {
                  setCurrentTestimonialIndex((prev) => {
                    const maxIndex = TESTIMONIALS.length - testimonialVisibleCount;
                    if (prev >= maxIndex) return 0;
                    return prev + 1;
                  });
                }}
                className="p-2 rounded-xl bg-navy-secondary border border-white/5 text-slate-300 hover:text-white hover:border-white/20 transition active:scale-95 cursor-pointer flex items-center justify-center shadow-md focus:outline-none"
                title="পরবর্তী রিভিউ"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsTestimonialAutoPlaying(!isTestimonialAutoPlaying)}
                className={`ml-2 px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition flex items-center gap-1 border cursor-pointer ${
                  isTestimonialAutoPlaying 
                    ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-600/10 text-amber-400 border-amber-500/20'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isTestimonialAutoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {isTestimonialAutoPlaying ? 'Auto on' : 'Paused'}
              </button>
            </div>
          </div>

          {/* Carousel Viewport Container */}
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) py-4" 
              style={{
                transform: `translate3d(-${currentTestimonialIndex * (100 / testimonialVisibleCount)}%, 0, 0)`,
                width: `${(TESTIMONIALS.length * 100) / testimonialVisibleCount}%`
              }}
              onMouseEnter={() => setIsTestimonialAutoPlaying(false)}
              onMouseLeave={() => setIsTestimonialAutoPlaying(true)}
            >
              {TESTIMONIALS.map((item) => (
                <div 
                  key={item.id} 
                  className="shrink-0 px-3 transition-all duration-300"
                  style={{ width: `${100 / TESTIMONIALS.length}%` }}
                >
                  <div className="bg-navy-secondary p-5 md:p-6 rounded-2xl border border-white/5 space-y-4 hover:border-white/10 hover:shadow-2xl transition hover:-translate-y-1 duration-300 h-full flex flex-col justify-between">
                    
                    <div className="space-y-3">
                      
                      {/* Rating Stars & Band Level Tag */}
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex gap-0.5 text-accent-gold">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current text-accent-gold" />
                          ))}
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-xs font-bold font-mono tracking-wide">
                          {item.writingScore}
                        </span>
                      </div>

                      {/* Message Content */}
                      <p className="text-slate-300 text-xs md:text-[13px] leading-relaxed italic select-none">
                        "{item.text}"
                      </p>

                    </div>

                    {/* Student Info Card Segment */}
                    <div className="border-t border-white/5 pt-4 mt-2 flex items-center gap-3">
                      <div className={`${item.avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow`}>
                        {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs md:text-sm">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {item.type} • <span className="text-accent-gold font-bold">{item.band}</span>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {[...Array(TESTIMONIALS.length - testimonialVisibleCount + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentTestimonialIndex(idx);
                  setIsTestimonialAutoPlaying(false); // temporary freeze custom select
                }}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  currentTestimonialIndex === idx 
                    ? 'bg-accent-red w-8' 
                    : 'bg-slate-600 hover:bg-slate-400 w-2.5'
                }`}
                aria-label={`Slide to page ${idx + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-slate-500 text-[10px] sm:text-xs mt-4 italic">
            💡 রিভিউ কার্ডের উপরে মাউস রাখলে অটো-স্লাইড সাময়িকভাবে থেমে থাকবে।
          </p>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent-red font-bold text-xs uppercase tracking-wider bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              Our Admission Plans 💎
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-navy-primary mt-3">ভর্তি সংক্রান্ত তথ্য ও কোর্স ফি</h2>
            <div className="h-1.5 w-20 bg-accent-red mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-600 mt-4 text-sm md:text-base">
              আপনার প্রয়োজন এবং বাজেট অনুযায়ী যেকোনো একটি প্ল্যান বেছে নিয়ে আজই আপনার IELTS Band ৭.০+ প্রিপারেশন শুরু করতে পারেন।
            </p>
          </div>

          <div className="max-w-md mx-auto">
            
            {/* Live Premium Plan */}
            <div className="bg-white p-8 rounded-2xl border-2 border-accent-red relative flex flex-col justify-between shadow-xl">
              <span className="absolute -top-3.5 right-6 bg-accent-red text-white text-xs px-4 py-1.5 rounded-full font-extrabold uppercase tracking-widest shadow flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> Popular Choice
              </span>
              
              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-accent-red uppercase tracking-widest flex items-center gap-1.5">
                     Premium Live Batch
                  </h4>
                  <div className="flex items-baseline mt-2 font-sans">
                    <span className="text-4xl md:text-5xl font-extrabold text-navy-primary">৳ ২,৯৯৯</span>
                    <span className="text-slate-500 ml-2 font-medium text-xs">/ এককালীন</span>
                  </div>
                  <p className="text-slate-500 text-xs">সহজ সরাসরি ক্লাস ও ট্রেইনারদের জুম মেন্টরিং সেশন।</p>
                </div>

                <div className="h-px bg-slate-200"></div>

                <ul className="space-y-4 text-slate-700 text-xs sm:text-sm">
                  <li className="flex items-center gap-2.5 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-accent-red shrink-0" />
                    <span>১২টি ইন্টারঅ্যাক্টিভ লাইভ জুম মাস্টারক্লাস</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-accent-red shrink-0" />
                    <span>১০টি রাইটিং স্ক্রিপ্ট ওয়ান-টু-ওয়ান জুম লাইভ ফিডব্যাক</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-accent-red shrink-0" />
                    <span>উইকলি লাইভ ডাউট সলভিং এবং রিভিশন প্র্যাকটিস</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-accent-red shrink-0" />
                    <span>১ বছরের লাইভ ক্লাসের ক্লাস রেকর্ডিং ও পোর্টাল লাইসেন্স</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-accent-red shrink-0" />
                    <span>২৪/৭ স্পেশাল টেলিগ্রাম ভিআইপি সাপোর্ট ও মেন্টর গ্রুপ</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button 
                  onClick={() => openPayment("Premium Live Batch", "৳ ২,৯৯৯", "live-premium")}
                  className="w-full bg-accent-red hover:bg-neutral-950 text-white py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow duration-200"
                  id="enroll-btn-live-premium"
                >
                  লাইভ ব্যাচে ভর্তি হোন ➔
                </button>
              </div>
            </div>

          </div>

          <div className="max-w-2xl mx-auto mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-sm text-slate-600 font-medium">
              ভর্তি বা পেমেন্ট সংক্রান্ত কোনো প্রশ্ন রয়েছে? সরাসরি হোয়াটসঅ্যাপ করুন অথবা কল করুন:
            </p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
              <a 
                href="https://wa.me/8801340861314" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-lg font-bold text-sm md:text-base transition duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp মেসেজ</span>
              </a>
              
              <a 
                href="tel:01340861314" 
                className="inline-flex items-center gap-2 bg-navy-secondary hover:bg-navy-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm md:text-base transition duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>সরাসরি কল: 01340861314</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              (সকাল ১০টা থেকে রাত ১০টা পর্যন্ত যেকোনো সময়ে সরাসরি কল বা মেসেজ করুন)
            </p>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-bg-light">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <div className="text-center mb-12">
            <span className="text-accent-red font-bold text-xs uppercase tracking-wider bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              Got Questions? 🤔
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-primary mt-3">সাধারণ কিছু জিজ্ঞাসা (FAQ)</h2>
            <div className="h-1 w-20 bg-accent-red mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setOpenedFaq(openedFaq === 1 ? null : 1)}
                className="w-full p-5 text-left font-bold text-navy-primary flex justify-between items-center text-sm md:text-base gap-4"
              >
                <span>১. কোর্সটি শুরু করার জন্য নূন্যতম একাডেমি বা বেসিক যোগ্যতা কেমন প্রয়োজন?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-250 ${openedFaq === 1 ? 'rotate-180' : ''}`} />
              </button>
              {openedFaq === 1 && (
                <div className="p-5 pt-0 border-t border-slate-50 text-xs md:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  যাদের বেসিক ইংলিশ সেন্টেন্স মেকিং বা সাধারণ বাক্য রচনা করতে তেমন সমস্যা নেই কিন্তু IELTS Writing-এর ফরম্যাট, চার্ট ডায়াগ্রাম বিশ্লেষণ, থিসিস কন্টেন্ট সাজানো ও সঠিক আইডিয়া ডেভেলপমেন্টে Band স্কোরের দুর্বলতা রয়েছে, তাদের জন্য এই কোর্সটি অত্যন্ত উপযোগী।
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setOpenedFaq(openedFaq === 2 ? null : 2)}
                className="w-full p-5 text-left font-bold text-navy-primary flex justify-between items-center text-sm md:text-base gap-4"
              >
                <span>২. রাইটিং স্ক্রিপ্টগুলো কিভাবে ইভ্যালুয়েশন বা ভুল চেক করা হবে?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-250 ${openedFaq === 2 ? 'rotate-180' : ''}`} />
              </button>
              {openedFaq === 2 && (
                <div className="p-5 pt-0 border-t border-slate-50 text-xs md:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  আমাদের নির্দিষ্ট ডেডিকেটেড লার্নিং পোর্টালে (LMS) আপনি আপনার লেখা খাতাটি ছবি তুলে অথবা মাইক্রোসফট ওয়ার্ড ফরম্যাটে জমা দিতে পারবেন। মেন্টর বা ট্রেইনার প্রতিটি স্ক্রিপ্ট Line-by-line চেক করে পুঙ্খানুপুঙ্খ ব্যাকরণগত ভুল, ভোকাবুলারি ইমপ্রুভমেন্টের জায়গা এবং সম্ভাব্য Band স্কোরসহ নির্ভুল ফিডব্যাক ফাইল আকারে প্রদান করবেন।
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setOpenedFaq(openedFaq === 3 ? null : 3)}
                className="w-full p-5 text-left font-bold text-navy-primary flex justify-between items-center text-sm md:text-base gap-4"
              >
                <span>৩. লাইভ ক্লাসের সময়সূচী কখন? ক্লাস মিস হলে কি রেকর্ডিং পাবো?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-250 ${openedFaq === 3 ? 'rotate-180' : ''}`} />
              </button>
              {openedFaq === 3 && (
                <div className="p-5 pt-0 border-t border-slate-50 text-xs md:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  লাইভ ব্যাচের ক্লাসগুলো সাধারণত প্রতি শুক্র ও শনিবার রাত ৮:৩০ মিনিটে জুম লাইভে সরাসরি অনুষ্ঠিত হয়। প্রতিটি ক্লাসের হাই-কোয়ালিটি ভিডিও রেকর্ডিং পরবর্তী সকালেই পোর্টালে আপলোড করে দেওয়া হবে, যা আপনি সুবিধামত যেকোনো সময় দেখতে পারবেন।
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setOpenedFaq(openedFaq === 4 ? null : 4)}
                className="w-full p-5 text-left font-bold text-navy-primary flex justify-between items-center text-sm md:text-base gap-4"
              >
                <span>৪. আমি কি একসাথে টাস্ক ১ এবং টাস্ক ২ উভয়ের ম্যাটেরিয়ালস পাবো?</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-250 ${openedFaq === 4 ? 'rotate-180' : ''}`} />
              </button>
              {openedFaq === 4 && (
                <div className="p-5 pt-0 border-t border-slate-50 text-xs md:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  হ্যাঁ, কোর্সে জয়েন করার সাথে সাথেই আপনি পূর্ববর্তী ক্লাসের স্টাডি ম্যাটেরিয়ালস, ভোকাবুলারি পিডিফ, স্যাম্পল রিসোর্স মডিউল ও ৩৫০+ Band ৯ এর সলিউশন ব্যাংক অ্যাক্সেস করতে পারবেন।
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer Element */}
      <footer className="bg-navy-primary text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xl font-bold text-white tracking-tight">IELTS <span className="text-accent-red">REVOLUTION</span></span>
            <p className="text-xs text-slate-500">© 2026 IELTS Revolution. All rights reserved.</p>
          </div>

          {/* Social Share Buttons */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs font-semibold text-slate-400 tracking-wider">এই কোর্সটি বন্ধুদের সাথে শেয়ার করুন:</span>
            <div className="flex items-center gap-3">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://ieltsrevolution.com')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition duration-300 border border-[#1877F2]/20 flex items-center justify-center shadow-sm"
                title="Share on Facebook"
                id="share-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ieltsrevolution.com')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition duration-300 border border-[#0A66C2]/20 flex items-center justify-center shadow-sm"
                title="Share on LinkedIn"
                id="share-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href || 'https://ieltsrevolution.com');
                  setCopiedShare(true);
                  setTimeout(() => setCopiedShare(false), 2000);
                }}
                className={`p-2.5 rounded-full transition duration-300 border flex items-center justify-center shadow-sm cursor-pointer ${
                  copiedShare 
                    ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border-slate-700'
                }`}
                title={copiedShare ? "Copied!" : "Copy Link"}
                id="share-copy-link"
              >
                {copiedShare ? (
                  <span className="text-[10px] font-bold px-1 text-emerald-400">কপি হয়েছে!</span>
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs md:text-sm">
            <span className="hover:text-white cursor-pointer transition">প্রাইভেসি পলিসি</span>
            <span className="hover:text-white cursor-pointer transition">শর্তাবলী</span>
            <a href="mailto:info@ieltsrevolution.com" className="hover:text-white transition">যোগাযোগ</a>
            <button 
              onClick={() => setShowAdminView(true)}
              className="hover:text-amber-400 transition flex items-center gap-1 font-semibold text-xs border border-slate-700 hover:border-amber-400 rounded px-2.5 py-1 text-slate-400 cursor-pointer"
            >
              🔐 Admin Dashboard
            </button>
          </div>
        </div>
      </footer>

      {/* Admission Checkout Dynamic Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border-t-8 border-accent-red animate-scaleIn">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent-red bg-red-50 border border-red-100 px-2 py-0.5 rounded">Admission Request</span>
                <h3 className="text-xl font-bold text-navy-primary mt-1">{selectedPlan.name}</h3>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {!paymentCompleted ? (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  
                  {/* Selected Plan Details block */}
                  <div className="bg-navy-primary text-white p-4 rounded-xl flex justify-between items-center">
                    <span className="text-xs">মোট কোর্স ফি (এককালীন):</span>
                    <span className="text-xl font-bold text-accent-gold">{selectedPlan.price}</span>
                  </div>

                  {/* Payment instructions */}
                  <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1.5 leading-relaxed">
                    <p className="font-bold flex items-center gap-1">💸 বিকাশ / নগদ মার্চেন্ট পেমেন্ট গাইড:</p>
                    <p>১. আপনার বিকাশ বা নগদ অ্যাপ থেকে <strong>পেমেন্ট (Payment)</strong> সিলেক্ট করুন।</p>
                    <p>২. আমাদের মার্চেন্ট নাম্বার প্রদান করুন: <strong className="text-navy-primary font-mono select-all">০১৭১২৪৫৬৭৮৯</strong></p>
                    <p>৩. ওপরে উল্লেখিত পরিমাণ টাকা পেমেন্ট করার পর ট্রানজেকশন আইডি সংগ্রহ করুন।</p>
                  </div>

                  {/* Payment Form inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11xp] font-bold text-slate-600 mb-1">১. যে নাম্বার থেকে পেমেন্ট করেছেন (মোবাইল নম্বর):</label>
                      <input 
                        type="tel"
                        required
                        value={paymentPhone}
                        onChange={(e) => setPaymentPhone(e.target.value)}
                        placeholder="যেমন: 018XXXXXXXX"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-accent-red transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11xp] font-bold text-slate-600 mb-1">২. পেমেন্ট ট্রানজেকশন আইডি (TrxID):</label>
                      <input 
                        type="text"
                        required
                        value={paymentTransaction}
                        onChange={(e) => setPaymentTransaction(e.target.value)}
                        placeholder="যেমন: 9K8DJ2MDL"
                        className="w-full text-xs font-mono px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-accent-red transition-all uppercase"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isAnalyzing}
                    className="w-full bg-accent-red hover:bg-neutral-900 text-white font-bold py-3 rounded-lg text-sm transition shadow-md flex justify-center items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>পেমেন্ট ভেরিফাই করা হচ্ছে...</span>
                      </>
                    ) : (
                      <span>পেমেন্ট ভেরিফিকেশন সম্পন্ন করুন</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border border-emerald-500">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">পেমেন্ট সফলভাবে সাবমিট হয়েছে!</h4>
                    <p className="text-xs text-slate-500 mt-2">
                      আমাদের পেমেন্ট টিম আপনার তথ্য যাচাই করার জন্য পরবর্তী সর্বোচ্চ ২-৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে। স্লট অ্যাক্টিভেশনের কনফার্মেশন এসএমএস আপনার মোবাইল <strong className="text-slate-800">{paymentPhone}</strong> এ পেয়ে যাবেন। 
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg text-left text-xs space-y-1">
                    <p className="font-bold text-navy-primary">পেমেন্ট রসিদ বিবরণী:</p>
                    <p>📦 কোর্স: {selectedPlan.name}</p>
                    <p>💰 পরিমাণ: {selectedPlan.price}</p>
                    <p>🔑 TrxID: <span className="font-mono text-accent-red uppercase font-bold">{paymentTransaction}</span></p>
                  </div>

                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full bg-navy-primary text-white py-2.5 rounded-lg font-bold text-xs"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}



      {/* Scroll to Top Floating Action Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-accent-red text-white p-3 md:p-3.5 rounded-full shadow-2xl hover:bg-navy-primary border border-white/20 hover:border-white/30 transition duration-300 cursor-pointer flex items-center justify-center z-40 group active:scale-95"
            title="উপরে যান (Scroll to Top)"
            id="scroll-to-top"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
