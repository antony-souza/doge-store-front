"use client";

import Sidebar from '@/app/components/doge_admin/sidebar';
import React from 'react';

export default function HomePage(): React.ReactElement {
  return <>
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
    </div>
  </>
}
