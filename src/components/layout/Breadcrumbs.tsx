
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAuth } from "@/App";

interface BreadcrumbsProps {
  title: string;
}

const Breadcrumbs = ({ title }: BreadcrumbsProps) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col gap-1 mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <nav>
        <ul className="flex gap-1 text-sm text-muted-foreground">
          <li>
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="hover:text-foreground">
              Beranda
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>{title}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
