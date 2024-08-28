'use client'
import { useState, useEffect } from "react";

interface MoreInfo {
  title: string;
  description: string;
}

export function MoreInformation() {
  const [moreInfo, setMoreInfo] = useState<MoreInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMoreInfo() {
      const response = await fetch('http://localhost:3000/api/more-info');
      const data: MoreInfo[] = await response.json();
      setMoreInfo(data);
      setIsLoading(false);
    }
    fetchMoreInfo();
  }, []);

  if (isLoading) {
    return <div className="text-center text-lg animate-pulse">Carregando...</div>;
  }

  return (
    <div>
      {moreInfo.map((info, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-bold">{info.title}</h3>
          <p className="text-md">{info.description}</p>
        </div>
      ))}
    </div>
  );
}