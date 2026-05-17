import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TopicItem {
  id: string;
  label: string;
  summary: string;
  code: string;
  highlights: string[];
}

interface TopicTabsProps {
  items: TopicItem[];
}

export function TopicTabs({ items }: TopicTabsProps) {
  const defaultItem = items[0]?.id ?? "topic";

  return (
    <Tabs defaultValue={defaultItem} className="w-full">
      <TabsList className="h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
        {items.map((item) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="rounded-full border border-border px-4 py-2 data-[state=active]:border-emerald-500 data-[state=active]:bg-emerald-500/10"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id} className="mt-6 space-y-4">
          <p className="text-muted-foreground">{item.summary}</p>
          <CodeBlock title={`${item.label}.tsx`} language="tsx" colorBorder="green" code={item.code} />
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
