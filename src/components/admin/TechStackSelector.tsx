import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChipList } from "@/components/ui/chips";
import { TECH_STACKS } from "@/constants/techStacks";

interface TechStackSelectorProps {
  selectedStacks: string[];
  isViewMode: boolean;
  onAddItem: (stack: string, value: string) => void;
  errors: any;
  onRemoveItem: (stack: string, value: string) => void;
}

const TechStackSelector = ({
  selectedStacks,
  isViewMode,
  onAddItem,
  errors,
  onRemoveItem,
}: TechStackSelectorProps) => {
  return (
    <div className="project-techStacks-input">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Tech Stacks
      </label>
      {isViewMode ? (
        <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-3">
          {selectedStacks?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedStacks.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">No tech stacks</span>
          )}
        </div>
      ) : (
        <>
          <Select
            value=""
            onValueChange={(value) => onAddItem("techStacks", value)}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Select Tech Stacks" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available Tech Stacks</SelectLabel>
                {TECH_STACKS.map((stack) => (
                  <SelectItem key={stack.id} value={stack.name}>
                    <img
                      src={stack.icon}
                      alt={stack.name}
                      className="mr-2 inline-block h-4 w-4"
                    />
                    {stack.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.techStacks && (
            <div className="mt-1 text-sm text-red-600">{errors.techStacks}</div>
          )}
          <ChipList
            items={selectedStacks}
            onRemove={(item) => onRemoveItem("techStacks", item)}
            variant="purple"
          />
        </>
      )}
    </div>
  );
};

export default TechStackSelector;
