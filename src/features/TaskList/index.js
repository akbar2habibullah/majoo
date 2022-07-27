import React from 'react'
import UpdateTask from '../UpdateTask'
import DeleteTask from '../DeleteTask'
import { Stack, Box, Text, StackDivider, Heading, useToast } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { checkTask } from '../../app/action'

function TaskList() {
	const tasks = useSelector((state) => state.tasks)
	const dispatch = useDispatch()
	const toast = useToast()

	if (!tasks.length) {
		return (
			<>
				<Box maxW='80%' p={10}>
					<Heading fontWeight='bold' size='lg' color='green.400'>
						No Task
					</Heading>
				</Box>
			</>
		)
	}
	return (
		<>
			<Stack direction='column' w='400px' maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }} spacing={4} alignItems='stretch'>
				{tasks
					.filter((task) => task.status === 0)
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.map((task) => (
						<Stack key={task.id} opacity={1} direction='row' justifyContent='space-between' divider={<StackDivider />} borderColor='gray.100' borderWidth='2px' p='5' borderRadius='lg'>
							<Stack
								direction='column'
								divider={<StackDivider />}
								w='100%'
								onClick={() => {
									dispatch(checkTask(task.id))
									toast({
										title: 'Task Archived',
										position: 'top',
										status: 'info',
										duration: 2000,
										isClosable: true,
									})
								}}
								cursor='pointer'
							>
								<Heading fontWeight='bold' size='lg' bgGradient='linear(to-l, blue.500, green.400)' bgClip='text'>
									{task.title}
								</Heading>
								<Text w='100%'>{task.description}</Text>
								<Text w='100%' color='gray'>
									{task.createdAt}
								</Text>
							</Stack>
							<Stack direction='column' justifyContent='center'>
								<UpdateTask task={task} />
								<DeleteTask task={task} />
							</Stack>
						</Stack>
					))}
			</Stack>
		</>
	)
}

export default TaskList
