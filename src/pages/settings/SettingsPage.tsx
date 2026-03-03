import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cài đặt"
        subtitle="Tùy chọn tối giản cho bảo mật và thông báo"
      />

      <Card>
        <CardHeader>
          <CardTitle>Bảo mật tài khoản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">

          </p>
          <Button variant="outline" onClick={() => navigate('/forgot-password')}>
            Mở trang đổi mật khẩu
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tùy chọn thông báo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex items-center justify-between">
            <Label htmlFor="system-noti">Thông báo trong hệ thống</Label>
            <Switch
              id="system-noti"
              checked={systemNotifications}
              onCheckedChange={setSystemNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="email-noti">Thông báo qua email</Label>
            <Switch
              id="email-noti"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
