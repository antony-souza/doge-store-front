"use client";

import React from 'react';
import { CompanyInformation } from '@/app/components/home/company-information';

export default function StorePage({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <>
      <CompanyInformation storeName={name} />
    </>
  );
}
