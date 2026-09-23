'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth, UserProfile } from '@/context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Clock,
  Edit3,
  Lock,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Compass,
  LogOut,
  MapPin,
  ExternalLink,
  Save,
  KeyRound
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';

// Subcomponent for editing personal profile information
function EditProfileSection({
  user,
  onUpdate
}: {
  user: UserProfile;
  onUpdate: (data: { fullName: string; phoneNumber?: string; bio?: string; avatarUrl?: string }) => Promise<void>;
}) {
  const [fullName, setFullName] = useState(user.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);
    setIsUpdating(true);

    try {
      await onUpdate({
        fullName,
        phoneNumber,
        bio,
        avatarUrl
      });
      setUpdateSuccess('Your profile information has been successfully updated.');
      setTimeout(() => setUpdateSuccess(null), 4000);
    } catch (err: unknown) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Personal Information</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Update your account details stored in the PostgreSQL database.
        </p>
      </div>

      {updateSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{updateSuccess}</span>
        </div>
      )}

      {updateError && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
          <AlertTriangle size={16} className="shrink-0" />
          <span>{updateError}</span>
        </div>
      )}

      <form onSubmit={handleProfileSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Full Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+62 812-3456-7890"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Email Address (Primary Identity)
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/60 border border-neutral-800/60 rounded-xl text-neutral-400 text-xs cursor-not-allowed"
            />
          </div>
          <span className="text-[11px] text-neutral-500 mt-1 block">
            Email serves as your unique authentication credential in PostgreSQL and cannot be changed here.
          </span>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Avatar Photo URL
          </label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Traveler Bio & Adventure Interests
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell your mountain guide and expedition crew about your fitness level and travel style..."
            className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={15} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isLoading, updateProfile, changePassword, deleteAccount, logout, openAuthModal } = useAuth();

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'expeditions' | 'danger'>('profile');

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Delete Account Confirmation State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);


  // Handle Password Change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 4000);
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmationText.trim().toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm account removal.');
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteAccount();
      setShowDeleteModal(false);
      router.push('/');
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account.');
      setIsDeleting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white p-6">
        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-neutral-400 text-sm tracking-widest uppercase">Connecting to Wanderlush passport...</p>
      </div>
    );
  }

  // Unauthenticated fallback view
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
        {/* Simple top bar */}
        <header className="p-6 border-b border-white/10 flex items-center justify-between max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors">
            <ArrowLeft size={18} />
            <span className="text-xs font-semibold tracking-wider uppercase">Return to Bromo</span>
          </Link>
          <span className="text-xs font-extrabold tracking-[0.25em] text-white">WANDERLUSH</span>
        </header>

        {/* Guest Content Card */}
        <main className="max-w-md mx-auto p-6 text-center my-auto">
          <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <User size={30} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-3">Traveler Account</h1>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            Sign in to view and manage your account details, edit your personal profile, or review expedition itineraries.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-xl transition-all cursor-pointer"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Create New Account
            </button>
          </div>
        </main>

        <footer className="p-6 text-center text-xs text-neutral-500 border-t border-white/5">
          Wanderlush Expeditions • Powered by .NET Clean Architecture & PostgreSQL
        </footer>

        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">Back to Bromo</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-[0.2em] uppercase">
              WANDERLUSH
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
              PASSPORT
            </span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 text-xs font-medium transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Profile Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* User Card Header */}
        <div className="relative rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 mb-8 overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-800 border-2 border-amber-400/40 shadow-xl relative">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.fullName}
                    fill
                    sizes="112px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-amber-400 bg-neutral-800 text-3xl font-bold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-neutral-950 font-bold text-[10px] tracking-wider uppercase border border-neutral-900 shadow">
                Active
              </span>
            </div>

            {/* Profile Overview Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {user.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  {user.role}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-neutral-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} className="text-neutral-500" />
                  {user.email}
                </span>
                {user.phoneNumber && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} className="text-neutral-500" />
                    {user.phoneNumber}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-neutral-500" />
                  Member since {new Date(user.createdAtUtc).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              {user.bio && (
                <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed italic">
                  &ldquo;{user.bio}&rdquo;
                </p>
              )}
            </div>

            {/* Quick Status / ID badge */}
            <div className="hidden lg:flex flex-col items-end justify-between border-l border-neutral-800 pl-6 shrink-0">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Database Record</span>
                <span className="font-mono text-[11px] text-amber-400">PostgreSQL (UUID)</span>
              </div>
              <div className="text-right mt-4">
                <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Security Layer</span>
                <span className="text-[11px] text-neutral-300 font-mono">JWT Bearer (8h)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-neutral-800 mb-8 overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3.5 px-3 text-xs sm:text-sm font-semibold tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Edit3 size={15} />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3.5 px-3 text-xs sm:text-sm font-semibold tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Lock size={15} />
            <span>Security & Password</span>
          </button>

          <button
            onClick={() => setActiveTab('expeditions')}
            className={`pb-3.5 px-3 text-xs sm:text-sm font-semibold tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'expeditions'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Compass size={15} />
            <span>Expedition History</span>
          </button>

          <button
            onClick={() => setActiveTab('danger')}
            className={`pb-3.5 px-3 text-xs sm:text-sm font-semibold tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'danger'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-neutral-400 hover:text-red-400'
            }`}
          >
            <Trash2 size={15} />
            <span>Delete Account</span>
          </button>
        </div>

        {/* Tab 1: Edit Profile */}
        {activeTab === 'profile' && (
          <EditProfileSection key={user.updatedAtUtc || user.id} user={user} onUpdate={updateProfile} />
        )}

        {/* Tab 2: Security & Password */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            {/* Change Password Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Change Password</h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Ensure your account is protected with a secure password.
                </p>
              </div>

              {passwordSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              {passwordError && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Current Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">New Password</label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isChangingPassword ? (
                      <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Shield size={15} />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Session & Security Info */}
            <div className="space-y-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Shield size={16} className="text-amber-400" />
                  <span>Authentication Architecture</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  This session is authenticated via standard HMAC SHA-256 JWT tokens. Claims are verified by .NET Clean Architecture middleware before accessing database tables.
                </p>

                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Algorithm:</span>
                    <span className="text-amber-400">HS256 (HMAC-SHA256)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subject (sub):</span>
                    <span className="truncate max-w-[180px]">{user.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Audience:</span>
                    <span>BromoClient</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Issuer:</span>
                    <span>BromoApi</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-amber-400" />
                  <span>Session Timestamps</span>
                </h3>
                <div className="text-xs text-neutral-400 space-y-2">
                  <div className="flex justify-between py-1 border-b border-neutral-800">
                    <span>Account Created:</span>
                    <span className="text-white font-mono">
                      {new Date(user.createdAtUtc).toLocaleString()}
                    </span>
                  </div>
                  {user.lastLoginAtUtc && (
                    <div className="flex justify-between py-1 border-b border-neutral-800">
                      <span>Last Sign In:</span>
                      <span className="text-white font-mono">
                        {new Date(user.lastLoginAtUtc).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {user.updatedAtUtc && (
                    <div className="flex justify-between py-1">
                      <span>Last Profile Update:</span>
                      <span className="text-white font-mono">
                        {new Date(user.updatedAtUtc).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Expeditions */}
        {activeTab === 'expeditions' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white tracking-tight mb-2">Saved Expeditions & Bookings</h2>
              <p className="text-xs text-neutral-400 mb-6">
                Volcanic expeditions and villa reservations connected with your passport.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Compass size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Bromo Sunrise Caldera Tour</h4>
                    <span className="text-[11px] text-neutral-400 block">Scheduled: 4x4 Land Cruiser 03:00 AM</span>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Confirmed Itinerary
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">Madakaripura Waterfall Trek</h4>
                    <span className="text-[11px] text-neutral-400 block">Certified Local Tengger Guide</span>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                      Pending Date Selection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Danger Zone (Delete Account) */}
        {activeTab === 'danger' && (
          <div className="bg-neutral-900 border border-red-500/20 rounded-3xl p-6 sm:p-8 max-w-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Delete Account</h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Once you delete your account, your profile record will be permanently deleted from the PostgreSQL database. Your expeditions, reservations, and credentials will no longer be accessible.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/15 mb-6 text-xs text-red-300/80">
              <p className="font-semibold mb-1 text-red-400">Warning: This action is permanent and irreversible.</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-400">
                <li>All profile data will be removed from the <code className="text-white">users</code> table.</li>
                <li>Your JWT token session will be revoked immediately.</li>
                <li>You will be redirected back to the homepage.</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setDeleteConfirmationText('');
                setDeleteError(null);
                setShowDeleteModal(true);
              }}
              className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
            >
              <Trash2 size={16} />
              <span>Delete My Account</span>
            </button>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Delete Account */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Confirm Account Deletion</h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Are you absolutely sure you want to permanently delete your account (<strong className="text-white">{user.email}</strong>)?
            </p>

            <div className="mb-4">
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Type <strong className="text-red-400">delete</strong> below to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="delete"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-red-500 transition-colors font-mono"
              />
            </div>

            {deleteError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmationText.trim().toLowerCase() !== 'delete'}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal />
    </div>
  );
}
