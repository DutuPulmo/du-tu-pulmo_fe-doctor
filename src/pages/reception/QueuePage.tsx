import { PageHeader } from '@/components/layout/PageHeader';

export const QueuePage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Quản lý hàng đợi"
                subtitle="Theo dõi danh sách bệnh nhân đang chờ khám"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default QueuePage;
