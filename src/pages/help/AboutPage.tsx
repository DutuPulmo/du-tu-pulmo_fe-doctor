import { PageHeader } from '@/components/layout/PageHeader';

export const AboutPage = () => {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Về Dutu Pulmo"
                subtitle="Thông tin hệ thống và phiên bản"
            />
            <div className="p-6">
                <p className="text-gray-600">Phiên bản 1.0.0</p>
            </div>
        </div>
    );
};

export default AboutPage;
