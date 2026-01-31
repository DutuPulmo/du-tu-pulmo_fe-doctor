import { PageHeader } from '@/components/layout/PageHeader';
import { useParams } from 'react-router-dom';

export const PatientDetailPage = () => {
    const { id } = useParams();

    return (
        <div className="space-y-6">
            <PageHeader
                title="Chi tiết bệnh nhân"
                subtitle={`Thông tin chi tiết và hồ sơ bệnh án của bệnh nhân`}
            />
            <div className="p-6">
                <p className="text-gray-600">Trang chi tiết bệnh nhân (ID: {id}) đang được xây dựng.</p>
            </div>
        </div>
    );
};

export default PatientDetailPage;
