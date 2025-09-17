export const statusText = {
  NEW: "Order is accepted.",
  WASHING: "Order is being processed.",
  COMPLETED: "Order is completed.",
  DELIVERY: "Order will be delivered soon.",
  CANCELLED: "Order has been cancelled.",
};

export const getStatusSteps = (status) => {
  const steps = [
    { title: "Order is accepted.", date: "09 Mar 2021 at 03:00 PM", icon: 'documentIcon', bgColor: "#bfd8f6" },
    { title: "Order is being processed.", date: "09 Mar 2021", icon: 'PickupOrderIcon', bgColor: "#fef5d8" },
    { title: "Order is completed.", date: "11 Mar 2021", icon: 'OrderOnWayIcon', bgColor: "#e5eaff" },
    { title: "Order will be delivered soon.", date: "11 Mar 2021 at 10:00 AM", icon: 'deliveryIcon', bgColor: "#ffecee" },
  ];

  // Determine which steps are completed based on status
  const statusIndex = {
    NEW: 0,
    WASHING: 1,
    COMPLETED: 2,
    DELIVERY: 3,
    CANCELLED: -1, // Special case for cancelled
  };

  const currentIndex = statusIndex[status] || 0;
  
  if (status === 'CANCELLED') {
    return steps.map((step, index) => ({
      ...step,
      completed: false,
      isCancelled: true
    }));
  }

  return steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex
  }));
};