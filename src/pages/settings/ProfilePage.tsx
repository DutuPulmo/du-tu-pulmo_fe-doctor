import { PageHeader } from '@/components/layout/PageHeader';

export const ProfilePage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Hồ sơ bác sĩ"
                subtitle="Quản lý thông tin cá nhân và tài khoản"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang hồ sơ bác sĩ đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default ProfilePage;
