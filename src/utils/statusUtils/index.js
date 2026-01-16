
export const formatDateTime = (dateString, timeString) => {
  if (!dateString) return '';

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return timeString
    ? `${formattedDate} at ${timeString}`
    : formattedDate;
};


export const getStatusSteps = (order) => {
  if (!order) return [];

  const { status, timeline = {} } = order;

  const {
    createdAt,
    acceptedAt,
    completedAt,
    cancelledAt,
    rejectedAt,
    deliveryDateTime,
  } = timeline;

  const steps = [
    {
      key: "placed",
      title: "Order is Placed",
      date: formatDateTime(createdAt),
      completed: true,
      iconColor: "#333",
      bgColor: "#dffafaff",
    },

    {
      key: "accepted",
      title: acceptedAt
        ? "Order is Being Processed"
        : "Order is Yet to be Processed",
      date: formatDateTime(acceptedAt),
      completed: !!acceptedAt,
      iconColor: "#FF9800",
      bgColor: "#fff3e0",
    },

    {
      key: "completed",
      title: completedAt
        ? "Order is Completed"
        : deliveryDateTime
          ? "Expected Delivery"
          : "Pending Delivery",
      date: formatDateTime(completedAt || deliveryDateTime),
      completed: !!completedAt,
      iconColor: "#4CAF50",
      bgColor: "#e6f4ea",
    }
  ];

  if (status === "cancelled") {
    return [
      steps[0],
      {
        key: "cancelled",
        title: "Order Cancelled",
        date: formatDateTime(cancelledAt),
        completed: true,
        iconColor: "#FF3B30",
        bgColor: "#f9dad9",
      },
    ];
  }

  if (status === "rejected") {
    return [
      steps[0],
      {
        key: "rejected",
        title: "Order Rejected",
        date: formatDateTime(rejectedAt),
        completed: true,
        iconColor: "#FF3B30",
        bgColor: "#f9dad9",
      },
    ];
  }

  return steps;
};




