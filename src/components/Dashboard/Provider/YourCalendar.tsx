import { useState } from "react";
// import { Link } from "@tanstack/react-router";
// import { SectionCard } from "@/components/common/SectionCard";
// import { Calendar } from "@/components/ui/calendar";
// import { useI18n } from "@/lib/i18n";

import { useI18n } from "../../../lib/i18n";
import { SectionCard } from "../../common/SectionCard";
import { Link } from "react-router-dom";
import { Calendar } from "../../ui/calendar";

export function YourCalendar() {
  const { t } = useI18n();
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <SectionCard
      title={t("provider.yourCalendar")}
      action={
        <Link
          to="/dashboard/provider/calendar"
          className="text-sm font-medium text-primary hover:underline"
        >
          {t("overview.viewAll")}
        </Link>
      }
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto"
      />
    </SectionCard>
  );
}
