import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Phần mềm quản lý nhà thuốc',
        short_name: 'Quản lý nhà thuốc',
        description: 'Phần mềm quản lý nhà thuốc giúp bạn quản lý thuốc, khách hàng, nhà cung cấp, hóa đơn, báo cáo, ...',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}