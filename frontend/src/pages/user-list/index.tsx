/**
 * External dependencies
 */
import { useNavigate } from "react-router-dom";
import { useFrappeGetCall } from "frappe-react-sdk";

/**
 * Internal dependencies
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Skeleton } from "@/components/skeleton";
import Typography from "@/components/typography";
import MetaTags from "@/components/meta-tags";
import PoweredBy from "@/components/powered-by";

interface UserAvailability {
  slug: string;
  full_name: string;
  user_image: string;
}

const UserList = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useFrappeGetCall(
    "frappe_appointment.api.personal_meet.get_all_available_users",
    undefined,
    undefined,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 3,
    }
  );

  const users: UserAvailability[] = data?.message ?? [];

  return (
    <>
      <MetaTags title="Book an Appointment" description="Select a person to book an appointment with" />
      <div className="w-full min-h-screen flex justify-center">
        <div className="container max-w-[74rem] mx-auto p-4 py-8 lg:py-16">
          <div className="mb-8">
            <Typography variant="h2" className="text-3xl font-semibold">
              Book an Appointment
            </Typography>
            <Typography className="text-muted-foreground mt-1">
              Select a person to schedule a meeting with.
            </Typography>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border"
                  >
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))
              : users.map((user) => (
                  <div
                    key={user.slug}
                    onClick={() => navigate(`/in/${user.slug}`)}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-pointer hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.user_image} alt={user.full_name} className="bg-blue-50 dark:bg-zinc-800" />
                      <AvatarFallback className="text-2xl">
                        {user.full_name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Typography variant="h3" className="text-lg font-semibold text-center truncate w-full">
                      {user.full_name}
                    </Typography>
                    <span className="text-sm text-blue-500 dark:text-blue-400">
                      Book a meeting
                    </span>
                  </div>
                ))}

            {!isLoading && users.length === 0 && (
              <div className="col-span-full flex justify-center items-center py-16">
                <Typography className="text-muted-foreground">
                  No users available for scheduling.
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
      <PoweredBy />
    </>
  );
};

export default UserList;
