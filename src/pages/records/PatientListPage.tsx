import { PageHeader } from '@/components/layout/PageHeader';

export const PatientListPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Danh sách bệnh nhân"
                subtitle="Quản lý thông tin và hồ sơ bệnh nhân"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default PatientListPage;
