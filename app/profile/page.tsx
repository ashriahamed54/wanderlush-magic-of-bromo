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
  Edit3,
  Lock,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Compass,
  LogOut,
  MapPin,
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
      setUpdateSuccess('Profile updated successfully.');
      setTimeout(() => setUpdateSuccess(null), 4000);
    } catch (err: unknown) {
      setUpdateError(err instanceof Error ? err.message : 'Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Personal Details</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Manage your traveler information and expedition contact preferences.
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
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aris Prasetyo"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
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
            Email Address
          </label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/60 border border-neutral-800/60 rounded-xl text-neutral-500 text-xs cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1.5">
            Avatar Image URL
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
            Bio & Travel Notes
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Mountain photography, sunrise trekking, and Bromo caldera expeditions..."
            className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isUpdating ? (
              <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save size={14} />
                <span>Save Profile</span>
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
  const { user, isLoading, updateProfile, changePassword, deleteAccount, logout, openAuthModal } = useAuth();

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
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 4000);
    } catch (err: unknown) {
      setPasswordError(err instanceof Error ? err.message : 'Current password verification failed.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmationText.trim().toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm.');
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
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-neutral-400 text-xs tracking-widest uppercase">Loading Traveler Profile...</p>
      </div>
    );
  }

  // Unauthenticated fallback view
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
        <header className="p-6 border-b border-white/10 flex items-center justify-between max-w-5xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors">
            <ArrowLeft size={16} />
            <span className="text-xs font-semibold tracking-wider uppercase">Return to Bromo</span>
          </Link>
          <span className="text-xs font-bold tracking-[0.25em] text-white uppercase">WANDERLUSH</span>
        </header>

        <main className="max-w-md mx-auto p-6 text-center my-auto">
          <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-5">
            <User size={26} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Traveler Account</h1>
          <p className="text-neutral-400 text-xs mb-8 leading-relaxed">
            Sign in to manage your traveler profile, update account credentials, or review your expedition itineraries.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </main>

        <footer className="p-6 text-center text-[11px] text-neutral-600 border-t border-white/5">
          Wanderlush Expeditions • Mount Bromo, East Java
        </footer>

        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-neutral-950 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors">
              <ArrowLeft size={14} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">Back to Bromo</span>
          </Link>

          <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
            WANDERLUSH
          </span>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-neutral-300 hover:text-red-400 border border-white/10 hover:border-red-500/20 text-xs font-medium transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Profile Layout */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* User Card Header - Clean & Centered */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-8 max-w-2xl mx-auto shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-neutral-800 border-2 border-neutral-700 shadow-md relative">
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.fullName}
                    fill
                    sizes="96px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-amber-400 bg-neutral-800 text-2xl font-bold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Overview Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {user.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] font-medium">
                  {user.role}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-neutral-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-neutral-500" />
                  {user.email}
                </span>
                {user.phoneNumber && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-neutral-500" />
                    {user.phoneNumber}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-neutral-500" />
                  Member since {new Date(user.createdAtUtc).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              {user.bio && (
                <p className="text-xs text-neutral-300 leading-relaxed italic max-w-xl">
                  &ldquo;{user.bio}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu - Perfectly Centered on Desktop, Scrollable from Start on Mobile */}
        <div className="flex justify-start sm:justify-center border-b border-neutral-800 mb-8 overflow-x-auto scrollbar-none gap-2 sm:gap-6 px-1 sm:px-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`shrink-0 pb-3 px-3 text-xs sm:text-sm font-medium tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Edit3 size={14} />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`shrink-0 pb-3 px-3 text-xs sm:text-sm font-medium tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'security'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Lock size={14} />
            <span>Security & Password</span>
          </button>

          <button
            onClick={() => setActiveTab('expeditions')}
            className={`shrink-0 pb-3 px-3 text-xs sm:text-sm font-medium tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'expeditions'
                ? 'border-amber-400 text-amber-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Compass size={14} />
            <span>Expedition History</span>
          </button>

          <button
            onClick={() => setActiveTab('danger')}
            className={`shrink-0 pb-3 px-3 text-xs sm:text-sm font-medium tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'danger'
                ? 'border-red-500 text-red-400 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-red-400'
            }`}
          >
            <Trash2 size={14} />
            <span>Delete Account</span>
          </button>
        </div>

        {/* Tab 1: Edit Profile (Centered) */}
        {activeTab === 'profile' && (
          <EditProfileSection key={user.updatedAtUtc || user.id} user={user} onUpdate={updateProfile} />
        )}

        {/* Tab 2: Security & Password (Centered) */}
        {activeTab === 'security' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Security & Password</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Update your account password to maintain secure access to your profile.
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
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
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
                  <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
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
                  <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
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
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isChangingPassword ? (
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Shield size={14} />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Expeditions (Centered) */}
        {activeTab === 'expeditions' && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">Expedition History</h2>
            <p className="text-xs text-neutral-400 mb-6">
              Your confirmed volcanic tours and scheduled caldera itineraries.
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Compass size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate">Bromo Sunrise Caldera Tour</h4>
                  <span className="text-[11px] text-neutral-400 block">4x4 Land Cruiser • King Kong Hill Viewpoint</span>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Confirmed Reservation
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate">Madakaripura Canyon Trek</h4>
                  <span className="text-[11px] text-neutral-400 block">Guided Highland Waterfall Expedition</span>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                    Pending Date Selection
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Delete Account (Centered) */}
        {activeTab === 'danger' && (
          <div className="bg-neutral-900 border border-red-500/20 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Delete Account</h2>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Permanently remove your traveler profile and account credentials. All saved expedition records will be deleted.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/15 mb-6 text-xs text-neutral-300">
              <p className="text-red-400 font-semibold mb-1">This action cannot be undone.</p>
              <p className="text-neutral-400">Once confirmed, your account will be immediately closed and you will be signed out.</p>
            </div>

            <button
              onClick={() => {
                setDeleteConfirmationText('');
                setDeleteError(null);
                setShowDeleteModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
            >
              <Trash2 size={14} />
              <span>Delete Account</span>
            </button>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Delete Account */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Confirm Account Deletion</h3>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Are you sure you want to permanently delete your account (<strong className="text-white">{user.email}</strong>)?
            </p>

            <div className="mb-4">
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Type <strong className="text-red-400 font-mono">delete</strong> to confirm:
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
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmationText.trim().toLowerCase() !== 'delete'}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={13} />
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
