import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  LogOut, 
  RefreshCw, 
  Lock, 
  User, 
  DollarSign, 
  Clock, 
  ArrowLeft, 
  Check, 
  Eye, 
  EyeOff, 
  Filter, 
  FileSpreadsheet, 
  PhoneCall, 
  ArrowRightLeft 
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  transactionId: string;
  planName: string;
  planPrice: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'declined';
}

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Payments logic states
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  // Load token from local storage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('ielts_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchPayments(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('ইউজারনেম এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem('ielts_admin_token', data.token);
        setIsLoggedIn(true);
        fetchPayments(data.token);
      } else {
        setLoginError(data.error || 'ইউজারনেম বা পাসওয়ার্ড সঠিক নয়!');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setLoginError('সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ielts_admin_token');
    setToken('');
    setIsLoggedIn(false);
    setPayments([]);
  };

  const fetchPayments = async (authToken?: string) => {
    const tokenToUse = authToken || token;
    if (!tokenToUse) return;

    setIsLoading(true);
    setApiError('');
    try {
      const res = await fetch('/api/admin/payments', {
        headers: {
          'Authorization': `Bearer ${tokenToUse}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.payments || []);
      } else {
        setApiError(data.error || 'পেমেন্ট তালিকা লোড করা যায়নি।');
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error('Fetch payments failed:', err);
      setApiError('পেমেন্ট তালিকা নিয়ে আসতে সমস্যা হয়েছে। পেজ রিফ্রেশ করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'approved' | 'declined') => {
    if (!token) return;
    setIsUpdatingId(id);

    try {
      const res = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Update local status matching the record
        setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      } else {
        alert(data.error || 'স্ট্যাটাস আপডেট করা সম্ভব হয়নি।');
      }
    } catch (err) {
      console.error('Update status failed:', err);
      alert('সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।');
    } finally {
      setIsUpdatingId(null);
    }
  };

  // Compute stats metrics
  const totalSubmissions = payments.length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const approvedCount = payments.filter(p => p.status === 'approved').length;
  const declinedCount = payments.filter(p => p.status === 'declined').length;

  // Revenue math: parses string formatted like "৳ ২,৯৯৯" or fallback to 2999
  const approvedRevenue = payments
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => {
      const digitsOnly = p.planPrice.replace(/[^0-9\u09E6-\u09EF]/g, '');
      const englishDigits = digitsOnly.replace(/[\u09E6-\u09EF]/g, (d) => {
        return String('০১২৩৪৫৬৭৮৯'.indexOf(d));
      });
      const parsed = parseInt(englishDigits, 10);
      return sum + (isNaN(parsed) ? 2999 : parsed);
    }, 0);

  const getStatusBadge = (status: 'pending' | 'approved' | 'declined') => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Approved
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Refused
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Pending
          </span>
        );
    }
  };

  // Filtered Payments list
  const filteredPayments = payments.filter(p => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      p.studentName.toLowerCase().includes(normalizedSearch) ||
      p.studentEmail.toLowerCase().includes(normalizedSearch) ||
      p.phone.includes(normalizedSearch) ||
      p.transactionId.toLowerCase().includes(normalizedSearch);
    
    if (statusFilter === 'all') return matchesSearch;
    return p.status === statusFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans" id="admin-root">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              IELTS Revolution <span className="text-red-500 text-xs px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20">Admin Base</span>
            </h1>
            <p className="text-xs text-slate-400">ভর্তি ও পেমেন্ট রিকোয়েস্ট যাচাইকরণ উইন্ডো</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            ল্যান্ডিং পেজে ফিরুন
          </button>
          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-rose-600/15 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-xs font-medium transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              লগআউট
            </button>
          )}
        </div>
      </header>

      {/* Main Core Container */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {!isLoggedIn ? (
          /* Sleek Administration Login Form */
          <div className="max-w-md mx-auto my-12 md:my-20">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-white">অ্যাডমিন লগইন পোর্টাল</h2>
                <p className="text-xs text-slate-400">পেমেন্ট অনুমোদন করতে অনুগ্রহ করে লগইন করুন</p>
              </div>

              {loginError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2 mb-4">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">ইউজারনেম (Username)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-red-500 transition-all font-mono"
                      placeholder="Username লিখুন"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">পাসওয়ার্ড (Password)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-red-500 transition-all font-mono"
                      placeholder="Password লিখুন"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase transition shadow-lg mt-4 flex items-center justify-center gap-1.5"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>তথ্য যাচাই করা হচ্ছে...</span>
                    </>
                  ) : (
                    <span>লগইন করুন ➔</span>
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-800 pt-4 text-center">
                <span className="text-[10px] text-slate-500 font-mono">Default credentials listed in .env.example file. (administrator / Maailulp1$%)</span>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="space-y-6">
            
            {/* Business Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-semibold">Total Revenue (Approved)</span>
                <div className="flex items-baseline mt-2 gap-1 flex-wrap">
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-500 font-sans">৳ {approvedRevenue.toLocaleString('bn-BD')}</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold mt-1">✓ {approvedCount} Payments Verified</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-semibold">Total Requests</span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">{totalSubmissions}</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">End-user submissions in list</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between border-l-4 border-l-amber-500">
                <span className="text-slate-400 text-xs font-semibold">Pending Verification</span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">{pendingCount}</span>
                </div>
                <span className="text-[10px] text-amber-400 font-medium mt-1 animate-pulse">● Awaiting check</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-semibold">Rejected Requests</span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-rose-500 font-mono">{declinedCount}</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Trash/Fake TxID filter info</span>
              </div>

            </div>

            {/* Main Action Bar, Filter and Searches */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Left Search input */}
              <div className="relative w-full md:max-w-md">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  placeholder="নাম, মোবাইল নম্বর বা TrxID দিয়ে সার্চ করুন..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Right Filter status options */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  ফিল্টার স্ট্যাটাস:
                </span>
                
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    statusFilter === 'all' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  All ({totalSubmissions})
                </button>

                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    statusFilter === 'pending' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800'
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    statusFilter === 'approved' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-800'
                  }`}
                >
                  Approved ({approvedCount})
                </button>

                <button
                  onClick={() => setStatusFilter('declined')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    statusFilter === 'declined' 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800'
                  }`}
                >
                  Refused ({declinedCount})
                </button>

                <button 
                  onClick={() => fetchPayments()}
                  disabled={isLoading}
                  className="p-2 bg-slate-900 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-800 transition active:scale-95 disabled:opacity-50"
                  title="তালিকা রিফ্রেশ করুন"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-red-500' : ''}`} />
                </button>
              </div>

            </div>

            {/* API error alert if any */}
            {apiError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs flex items-center gap-2">
                <XCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <span>{apiError}</span>
              </div>
            )}

            {/* List / Table of payment entries */}
            {isLoading && payments.length === 0 ? (
              <div className="text-center py-20 bg-slate-950 border border-slate-800 rounded-3xl space-y-3">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-slate-400 font-medium">পেমেন্ট তালিকা লোড করা হচ্ছে...</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="text-center py-20 bg-slate-950 border border-slate-800 rounded-3xl">
                <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-300">কোনো পেমেন্ট তথ্য পাওয়া যায়নি</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  আপনার সিলেক্ট করা ফিল্টারের অধীনে কোনো পেমেন্ট রেকর্ড নেই অথবা সার্চ কুয়েরি মেলেনি।
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Desktop view: Structured Grid Table */}
                <div className="hidden lg:block bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="px-5 py-4">সময় (Date)</th>
                        <th className="px-5 py-4">শিক্ষার্থী বিবরণী (Student info)</th>
                        <th className="px-5 py-4">কোর্স বিবরণী (Selected Plan)</th>
                        <th className="px-5 py-4">পেমেন্টকৃত নাম্বার (Sender Phone)</th>
                        <th className="px-5 py-4">ট্রানজেকশন আইডি (TrxID)</th>
                        <th className="px-5 py-4 text-center">স্ট্যাটাস (Status)</th>
                        <th className="px-5 py-4 text-right">পদক্ষেপ (Actions)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {filteredPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/50 transition">
                          
                          {/* Date timestamp */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="font-semibold text-slate-300">
                              {new Date(p.timestamp).toLocaleDateString('bn-BD', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">
                              {new Date(p.timestamp).toLocaleTimeString('bn-BD', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </td>

                          {/* Student Details */}
                          <td className="px-5 py-4">
                            <div className="font-bold text-sm text-white">{p.studentName}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{p.studentEmail}</div>
                          </td>

                          {/* Plan and Price */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="text-white font-semibold text-xs py-0.5 px-2.5 rounded bg-slate-800 leading-tight">
                              {p.planName}
                            </span>
                            <div className="text-amber-500 font-bold font-sans mt-1">{p.planPrice}</div>
                          </td>

                          {/* Sender Phone */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <a 
                              href={`tel:${p.phone}`} 
                              className="inline-flex items-center gap-1 text-slate-300 hover:text-white hover:underline font-mono"
                            >
                              <PhoneCall className="w-3 h-3 text-slate-500" />
                              {p.phone}
                            </a>
                          </td>

                          {/* Transaction ID */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-red-400 font-extrabold font-mono text-sm tracking-wider bg-slate-900 border border-slate-800 rounded px-2.5 py-1 select-all w-max uppercase">
                              {p.transactionId}
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="px-5 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(p.status)}
                          </td>

                          {/* Quick Admin Action Controls */}
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            {isUpdatingId === p.id ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-auto"></div>
                            ) : (
                              <div className="inline-flex items-center gap-2">
                                {p.status !== 'approved' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'approved')}
                                    className="px-2.5 py-1.5 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold rounded-lg border border-emerald-500/20 transition cursor-pointer"
                                    title="পেমেন্ট অনুমোদন করুন"
                                  >
                                    Approve ✅
                                  </button>
                                )}
                                {p.status !== 'declined' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'declined')}
                                    className="px-2.5 py-1.5 bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-bold rounded-lg border border-rose-500/20 transition cursor-pointer"
                                    title="রিজেক্ট করুন"
                                  >
                                    Reject ❌
                                  </button>
                                )}
                                {p.status !== 'pending' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'pending')}
                                    className="p-1 px-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-semibold rounded border border-slate-800 transition cursor-pointer"
                                    title="পেন্ডিং করুন"
                                  >
                                    Mark Pending
                                  </button>
                                )}
                              </div>
                            )}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile / Tablet view: Stacked Elegant Cards */}
                <div className="grid md:grid-cols-2 gap-4 lg:hidden">
                  {filteredPayments.map((p) => (
                    <div key={p.id} className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4 hover:border-slate-700 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[10px] text-slate-500 font-semibold font-mono">
                            {new Date(p.timestamp).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })} • {new Date(p.timestamp).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <h4 className="text-base font-bold text-white mt-1">{p.studentName}</h4>
                          <span className="text-xs text-slate-500">{p.studentEmail}</span>
                        </div>
                        {getStatusBadge(p.status)}
                      </div>

                      <div className="h-px bg-slate-900"></div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block">কোর্স (Plan)</span>
                          <span className="text-slate-300 font-bold">{p.planName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">টাকা (Price)</span>
                          <span className="text-amber-500 font-extrabold font-sans">{p.planPrice}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">মোবাইল নম্বর (Sender)</span>
                          <a href={`tel:${p.phone}`} className="text-slate-300 font-mono flex items-center gap-1 hover:underline">
                            <PhoneCall className="w-3 h-3 text-slate-500" />
                            {p.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-500 block">ট্রানজেকশন (TrxID)</span>
                          <span className="text-red-400 font-extrabold font-mono select-all uppercase">{p.transactionId}</span>
                        </div>
                      </div>

                      <div className="h-px bg-slate-900"></div>

                      <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-mono">ID: {p.id}</span>
                        
                        {isUpdatingId === p.id ? (
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <div className="flex gap-1.5">
                            {p.status !== 'approved' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'approved')}
                                className="px-2.5 py-1.5 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white text-[11px] font-bold rounded-lg border border-emerald-500/20 cursor-pointer"
                              >
                                Approve ✓
                              </button>
                            )}
                            {p.status !== 'declined' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'declined')}
                                className="px-2.5 py-1.5 bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white text-[11px] font-bold rounded-lg border border-rose-500/20 cursor-pointer"
                              >
                                Reject ✕
                              </button>
                            )}
                            {p.status !== 'pending' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'pending')}
                                className="px-2 py-1 bg-slate-900 text-slate-400 text-[10px] font-semibold rounded border border-slate-800 cursor-pointer"
                              >
                                Pending
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer Branding Credit */}
      <footer className="bg-slate-950 border-t border-slate-800 py-4 text-center text-xs text-slate-500 font-sans mt-auto">
        <p>© {new Date().getFullYear()} IELTS REVOLUTION Administration Panel. All Rights Reserved.</p>
      </footer>
      
    </div>
  );
};
