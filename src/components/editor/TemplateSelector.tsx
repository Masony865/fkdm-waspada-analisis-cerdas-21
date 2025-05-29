
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector = ({ templates, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              {template.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => onTemplateSelect(template.id)}
              variant="outline"
            >
              <FileText className="h-4 w-4 mr-2" />
              Gunakan Template
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
