import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

export type Sentiment = {
  _id: string;
  username: string;
  tweet: string;
  translated: string;
  sentiment: string;
  negativeWords: Array<string>;
};

export const columns: ColumnDef<Sentiment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "tweet",
    header: "Tweet",
    cell: ({ row }) => <div>{row.getValue("tweet")}</div>,
  },
  {
    accessorKey: "translated",
    header: "Translated",
    cell: ({ row }) => {
      const negativeWords = row.original.negativeWords; // Daftar kata negatif dari data
      const translatedText: string = row.getValue("translated"); // Pastikan ini adalah string

      // Split the translated text into words
      const words = translatedText.split(" ");

      // Map through words and wrap negative words with a span
      const highlightedText = words.map((word, index) => {
        // Check if the word contains any negative word
        const isNegative = negativeWords.some((negWord) =>
          word.toLowerCase().includes(negWord.toLowerCase())
        );

        return (
          <>
            <span className={isNegative ? "text-red-500 font-bold" : ""}>
              {word}
            </span>{" "}
          </>
        );
      });

      return <div>{highlightedText}</div>;
    },
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sentiment")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const sentiment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(sentiment._id)}
            >
              Copy Tweet ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View tweet details</DropdownMenuItem>
            {/* Add more actions as needed */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
