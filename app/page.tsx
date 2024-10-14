"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage() {

  const router = useRouter();

  //TODO remover na versao final
  useEffect(() => {
    router.replace('/doge_client');
  }, [])

  return (
    <>

    </>
  );
}
