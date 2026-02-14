import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, TimePicker, message, Divider, Tag, DatePicker } from "antd";
import moment from "moment";
import Dashboard from "./dashboard";
import availabilityApi from "../../apiManger/availability";
import useUserStore from "../../store/user";

const Schedule = () => {
  const [weeklyAvailability, setWeeklyAvailability] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);
  const { user } = useUserStore();

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const stripSlotFields = (slot) => ({
    startTime: slot.startTime,
    endTime: slot.endTime,
  });

  const fetchAvailability = useCallback(async () => {
    setLoading(true);
    try {
      const res = await availabilityApi.getOwnAvailability();
      if (res?.data?.availability) {
        const { weeklyAvailability, unavailableDates } = res.data.availability;
        setWeeklyAvailability({
          monday: (weeklyAvailability.monday || []).map(stripSlotFields),
          tuesday: (weeklyAvailability.tuesday || []).map(stripSlotFields),
          wednesday: (weeklyAvailability.wednesday || []).map(stripSlotFields),
          thursday: (weeklyAvailability.thursday || []).map(stripSlotFields),
          friday: (weeklyAvailability.friday || []).map(stripSlotFields),
          saturday: (weeklyAvailability.saturday || []).map(stripSlotFields),
          sunday: (weeklyAvailability.sunday || []).map(stripSlotFields),
        });
        setUnavailableDates(
          (unavailableDates || []).map((d) => moment(d).format("YYYY-MM-DD"))
        );
        setHasExisting(true);
      }
    } catch (e) {
      setHasExisting(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const onTimeChange = (day, value) => {
    if (!value || value.length !== 2) {
      setWeeklyAvailability((prev) => ({ ...prev, [day]: [] }));
      return;
    }
    const [start, end] = value;
    setWeeklyAvailability((prev) => ({
      ...prev,
      [day]: [
        {
          startTime: start.format("HH:mm"),
          endTime: end.format("HH:mm"),
        },
      ],
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const cleanedWeekly = Object.fromEntries(
      days.map((day) => [day, (weeklyAvailability[day] || []).map(stripSlotFields)])
    );
    const hasAnySlot = days.some(
      (day) => (cleanedWeekly[day] || []).length > 0
    );
    if (!hasAnySlot) {
      message.error("Add at least one time window before saving.");
      setLoading(false);
      return;
    }
    const payload = {
      weeklyAvailability: cleanedWeekly,
      unavailableDates: unavailableDates.map((d) =>
        moment(d, "YYYY-MM-DD").startOf("day").toISOString()
      ),
    };
    try {
      if (hasExisting) {
        await availabilityApi.updateAvailability(payload);
        message.success("Availability updated");
      } else {
        await availabilityApi.createAvailability(payload);
        message.success("Availability saved");
        setHasExisting(true);
      }
      fetchAvailability();
    } catch (err) {
      message.error("Failed to save availability");
    }
    setLoading(false);
  };

  if (user?.role !== "mentor") {
    return (
      <Dashboard>
        <Card>Only mentors can manage availability.</Card>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Weekly Availability</h2>
          <Button type="primary" loading={loading} onClick={handleSave}>
            Save
          </Button>
        </div>
        <Card>
          {days.map((day) => (
            <div key={day} className="flex flex-col gap-2 py-2">
              <div className="flex items-center justify-between">
                <span className="capitalize font-semibold">{day}</span>
                <Button size="small" onClick={() => onTimeChange(day, null)}>
                  Clear
                </Button>
              </div>
              <TimePicker.RangePicker
                format="HH:mm"
                minuteStep={15}
                value={
                  weeklyAvailability[day]?.[0]
                    ? [
                        moment(weeklyAvailability[day][0].startTime, "HH:mm"),
                        moment(weeklyAvailability[day][0].endTime, "HH:mm"),
                      ]
                    : null
                }
                onChange={(val) => onTimeChange(day, val)}
                allowClear
              />
              <Divider className="my-2" />
            </div>
          ))}
        </Card>

        <Card title="Unavailable Dates" extra={<span>Optional</span>}>
          <div className="flex items-center gap-3 mb-3">
            <DatePicker
              disabledDate={(current) => current && current < moment().startOf("day")}
              onChange={(date) => {
                if (!date) return;
                const formatted = date.format("YYYY-MM-DD");
                setUnavailableDates((prev) =>
                  prev.includes(formatted) ? prev : [...prev, formatted]
                );
              }}
            />
            <span className="text-sm text-gray-500">Add a date to block it</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {unavailableDates.length === 0 && <span>No dates marked</span>}
            {unavailableDates.map((d) => (
              <Tag
                key={d}
                closable
                onClose={() =>
                  setUnavailableDates((prev) => prev.filter((x) => x !== d))
                }
              >
                {moment(d).format("DD MMM YYYY")}
              </Tag>
            ))}
          </div>
        </Card>
      </div>
    </Dashboard>
  );
};

export default Schedule;
