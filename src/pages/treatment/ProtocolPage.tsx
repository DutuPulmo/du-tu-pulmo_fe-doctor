import { PageHeader } from '@/components/layout/PageHeader';

export const ProtocolPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Phác đồ điều trị"
                subtitle="Quản lý và cập nhật các phác đồ điều trị chuẩn"
            />
            <div className="p-6">
                <p className="text-gray-600">Trang này đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default ProtocolPage;
