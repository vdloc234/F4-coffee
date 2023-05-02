import produce from "immer";
import React from "react";

enum ExecutionPhases {
	CHECK_EXCLUSION = "CHECK_EXCLUSION",
	GET_CONFIG_INFO = "GET_CONFIG_INFO",
	GET_INITIAL_DATA = "GET_INITIAL_DATA",
}

export interface IService {
	executeOrder: number;
	services: (() => Promise<unknown>)[];
	onSuccess: () => Promise<unknown>;
	terminateCondition: (a: any) => boolean;
}

enum ComponentEnum {
	WSLPCMN0010013 = "WSLPCMN0010013",
	WSLPCMN0010042 = "WSLPCMN0010042",
	WSLPCMN0010041 = "WSLPCMN0010041",
}

export interface IComponentServicesInfo {
	name: ComponentEnum;
	servicesConfig: IService[];
}

export interface IServicesQueueConfig {
	streamName: string;
	// queue: { [componentName in ComponentEnum]: IComponentServicesInfo[] } | Record<string, never>;
	queue: IComponentServicesInfo[];
}

type ServicesQueueParams = {
	streamName: string;
	servicesQueueConfig: IComponentServicesInfo[];
	// orderedComponentQueue: ComponentEnum[];
	// orderedServicesQueue: ExecutionPhases[];
};

export const useServicesQueue = (params: ServicesQueueParams) => {
	const {
		streamName,
		servicesQueueConfig,
		// orderedComponentQueue,
		// orderedServicesQueue,
	} = params;

	const servicesList = React.useRef<IServicesQueueConfig>({
		streamName,
		queue: [...servicesQueueConfig],
	});

	// const checkRegistedService = () => false;

	// const registerServices = (
	// 	componentName: string,
	// 	serviceInfo: IComponentServicesInfo
	// ) => {
	// 	console.log(componentName, serviceInfo);
	// 	servicesList.current?.queue?.[componentName] = serviceInfo;
	// 	const currentServicesStream = produce(servicesList.current, (draft) => {
	// 		const { queue } = draft;
	// 		if (!queue?.[componentName as keyof typeof queue]) {
	// 			draft.queue = { ...queue, [componentName]: serviceInfo };
	// 			return;
	// 		}
	// 		draft.queue = { ...queue };
	// 		const { name, services } = serviceInfo;
	// 		if (!queue?.[componentName as keyof typeof queue]?.[name]) {
	// 			draft.queue = { ...queue };
	// 		}
	// 	});
	// 	servicesList.current = currentServicesStream;
	// };

	// const hasFailureRequest = (responses: Promise<any>[]) =>
	// 	responses.some((response) => response?.data?.responseCode !== 200);

	const executeServicesQueue = () => {
		const { queue } = servicesList.current;

		try {
			queue.forEach(async (component) => {
				const orderedGroupServices = component.servicesConfig.sort(
					(prev, next) => next.executeOrder - prev.executeOrder
				);

				for (const o of orderedGroupServices) {
					const response = await Promise.all(o.services);
					const keepGoing = o.terminateCondition(response);
					if (!keepGoing) {
						throw new Error("Stop all following services!");
					}
				}
			});
		} catch (err) {
			throw new Error(err as string);
		}
	};
	return { servicesList, executeServicesQueue };
};


import produce from "immer";
import React from "react";

enum ExecutionPhases {
	CHECK_EXCLUSION = "CHECK_EXCLUSION",
	GET_CONFIG_INFO = "GET_CONFIG_INFO",
	GET_INITIAL_DATA = "GET_INITIAL_DATA",
}

export interface IService {
	servicePhase: ExecutionPhases;
	service: () => void;
	terminateCondition: () => boolean;
}

enum ComponentEnum {
	WSLPCMN0010013 = "WSLPCMN0010013",
	WSLPCMN0010042 = "WSLPCMN0010042",
	WSLPCMN0010041 = "WSLPCMN0010041",
}

export interface IComponentServicesInfo {
	name: ComponentEnum;
	services: IService[];
}

export interface IServicesQueueConfig {
	streamName: string;
	// queue: { [componentName in ComponentEnum]: IComponentServicesInfo[] } | Record<string, never>;
	queue: IComponentServicesInfo[];
}

type ServicesQueueParams = {
	streamName: string;
	servicesQueueConfig: IComponentServicesInfo[];
  orderedComponentQueue: ComponentEnum[];
	orderedServicesQueue: ExecutionPhases[];
};

export const useServicesQueue = (params: ServicesQueueParams) => {
  const {
    streamName,
    servicesQueueConfig,
    orderedComponentQueue,
    orderedServicesQueue,
  } = params;

	const servicesList = React.useRef<IServicesQueueConfig>({
		streamName,
		queue: [...servicesQueueConfig],
	});

	// const checkRegistedService = () => false;

	const registerServices = (
		componentName: string,
		serviceInfo: IComponentServicesInfo
	) => {
		console.log(componentName, serviceInfo);
		// servicesList.current?.queue?.[componentName] = serviceInfo;
		// const currentServicesStream = produce(servicesList.current, (draft) => {
		// 	const { queue } = draft;
		// 	if (!queue?.[componentName as keyof typeof queue]) {
		// 		draft.queue = { ...queue, [componentName]: serviceInfo };
		// 		return;
		// 	}
		// 	draft.queue = { ...queue };
		// 	const { name, services } = serviceInfo;
		// 	if (!queue?.[componentName as keyof typeof queue]?.[name]) {
		// 		draft.queue = { ...queue };
		// 	}
		// });
		servicesList.current = currentServicesStream;
	};

	const executeServicesQueue = () => {
    const {queue} = servicesList.current;
    try {
      orderedComponentQueue.forEach((component) => {
        if (!(component in queue)) {
          throw new Error(`Component ${component} has no registered services`)
        } else {
          queue[component]
        }
      })
    }
  };
	return { screenServicesList, registerServices, executeServicesQueue };
};
