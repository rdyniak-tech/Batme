import { Avatar } from "./Avatar";

const sizeClasses = { md: "-space-x-3", lg: "-space-x-4" } as const;

export function OpponentAvatar({
  name,
  isTeam,
  members,
  size = "md",
}: {
  name: string;
  isTeam?: boolean;
  members?: string[];
  size?: "md" | "lg";
}) {
  if (isTeam && members?.length) {
    return (
      <div className={`flex ${sizeClasses[size]}`}>
        {members.slice(0, 3).map((m) => (
          <Avatar key={m} name={m} size={size} />
        ))}
      </div>
    );
  }
  return <Avatar name={name} size={size} />;
}
