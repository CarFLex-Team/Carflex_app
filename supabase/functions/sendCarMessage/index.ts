import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Environment variables from Supabase
const supabaseUrl = Deno.env.get("PROJECT_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Example email sender
async function sendEmail(car: any) {
  console.log("Sending email for car:", car.id);
  // Integrate your email provider here
  // e.g., fetch("https://api.resend.com/emails", ...)
}

export default function priceStatus(
  price: number | null,
  est_value: number | null,
  real_value?: number | null,
) {
  if ((real_value === 0 || real_value) && !isNaN(real_value)) {
    est_value = real_value;
  }
  if (!est_value || !price || isNaN(price)) return "Unknown";

  const difference = est_value - price;
  const differencePercent = (difference / price) * 100;
  if (difference >= 0) {
    return "Steal";
  } else if (
    difference < 0 &&
    difference >= -3000 &&
    differencePercent >= -10
  ) {
    return "Good";
  } else if (difference >= -5000 && differencePercent >= -20) {
    return "Potential";
  } else {
    return "Entertain";
  }
}

serve(async (req) => {
  const car = await req.json();

  // Recalculate status on server
  const status = priceStatus(car.price, car.est_value, car.real_value);

  if (status === "Steal" && !car.message_sent) {
    await sendEmail(car);

    // Mark message as sent in DB
    await supabase
      .from("all")
      .update({ message_sent: true })
      .eq("id", car.id);
  }

  return new Response(JSON.stringify({ success: true, status }), { status: 200 });
});