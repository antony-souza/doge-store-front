import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/router";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

        useEffect(() => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push(routes.LOGIN);
            } else {

                setIsAuthenticated(true);
            }
        }, [router]);

        if (isAuthenticated === null) {
            return <div className="flex flex-col space-y-3 justify-center items-center h-screen">
                <Skeleton className="h-[100px] w-[200px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-3 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                </div>
            </div>;
        }

        return <WrappedComponent {...props} />;
    };

    AuthenticatedComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return AuthenticatedComponent;
};

export default withAuth;
