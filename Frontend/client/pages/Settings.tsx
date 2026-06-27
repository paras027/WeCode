import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({
    email: true,
    submissions: true,
    contests: true,
    discussions: false,
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="mb-6 font-semibold">Profile Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    defaultValue="CodeMaster"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    defaultValue="user@example.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    className="mt-1 min-h-24 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    defaultValue="Passionate about solving problems and learning new algorithms."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Profile Picture</label>
                  <div className="mt-1 flex items-center gap-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster"
                      alt="Profile"
                      className="h-16 w-16 rounded-lg border-2 border-border"
                    />
                    <Button variant="outline">Upload Photo</Button>
                  </div>
                </div>

                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card className="p-6">
              <h2 className="mb-6 font-semibold">Account Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-medium">Change Password</h3>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Current password"
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                    />
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="mb-3 font-medium">Connected Accounts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-border p-3">
                      <span>GitHub</span>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-border p-3">
                      <span>Google</span>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="mb-3 font-medium text-error">Delete Account</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className="p-6">
              <h2 className="mb-6 font-semibold">Preferences</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Theme</label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Default Language</label>
                  <Select defaultValue="javascript">
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Editor Theme</label>
                  <Select defaultValue="vs-dark">
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vs-dark">VS Dark</SelectItem>
                      <SelectItem value="github-dark">GitHub Dark</SelectItem>
                      <SelectItem value="monokai">Monokai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="mb-6 font-semibold">Security</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 font-medium">Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleNotificationChange(key)}
                            className="h-4 w-4 rounded border border-border"
                          />
                          <span className="capitalize">
                            {key === 'email' ? 'Email Notifications' : `${key} Notifications`}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="mb-3 font-medium">Two-Factor Authentication</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="mb-3 font-medium">Active Sessions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="font-medium">Chrome on Mac</p>
                        <p className="text-sm text-muted-foreground">Last active: Now</p>
                      </div>
                      <span className="rounded bg-success/20 px-2 py-1 text-xs font-semibold text-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
