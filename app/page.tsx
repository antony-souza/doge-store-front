"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/router";

export default function RedirectPage() {

  const router = useRouter();

  //TODO remover na versao final
  useEffect(() => {
    router.replace(routes.LOGIN);
  }, [router]);
}
