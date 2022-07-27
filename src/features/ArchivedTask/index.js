import React from 'react'
import { Stack, Box, Text, StackDivider, Heading, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTask } from '../../app/action'

function TaskList() {
	const dispatch = useDispatch()
	const tasks = useSelector((state) => state.tasks)
	const toast = useToast()

	if (!tasks.length) {
		return (
			<>
				<Box maxW='80%' p={10}>
					<Heading fontWeight='bold' size='lg' color='blue.500'>
						No Archived
					</Heading>
				</Box>
			</>
		)
	}
	return (
		<>
			<Stack direction='column' w='400px' maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }} spacing={4} alignItems='stretch'>
				{tasks
					.filter((task) => task.status === 1)
					.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
					.map((task) => (
						<Stack
							key={task.id}
							opacity={0.8}
							direction='column'
							divider={<StackDivider />}
							w='100%'
							onClick={() => {
								dispatch(checkTask(task.id))
								toast({
									title: 'Task Unarchived',
									position: 'top',
									status: 'info',
									duration: 2000,
									isClosable: true,
								})
							}}
							cursor='pointer'
							borderColor='gray.100'
							borderWidth='2px'
							p='5'
							borderRadius='lg'
						>
							<Heading fontWeight='bold' size='lg' as='s' bgGradient='linear(to-l, blue.500, green.400)' bgClip='text'>
								{task.title}
							</Heading>
							<Text w='100%' as='s'>
								{task.description}
							</Text>
							<Text w='100%' as='s' color='gray'>
								{task.createdAt}
							</Text>
						</Stack>
					))}
			</Stack>
		</>
	)
}

export default TaskList
