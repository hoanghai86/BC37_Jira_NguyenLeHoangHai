const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 3887,
        avatar: "https://ui-avatars.com/api/?name=Hải",
        name: "Hải",
        alias: "hai",
      },
    ],
    lstComment: [],
    taskId: 8243,
    taskName: "Task hainlh 1",
    alias: "task-hainlh-1",
    description: "<p>abc</p>",
    statusId: "2",
    originalEstimate: 10,
    timeTrackingSpent: 10,
    timeTrackingRemaining: 10,
    typeId: 2,
    priorityId: 2,
    projectId: 10670,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {

  default:
    return state
  }
}
