import { Heading, VStack, Tabs, Tab, TabPanel, TabPanels, TabList } from '@chakra-ui/react'
import TaskList from './features/TaskList'
import AddTask from './features/AddTask'
import ArchivedTask from './features/ArchivedTask'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTasks } from './app/action'

function App() {
	const tasks = useSelector((state) => state.tasks)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTasks())
	}, [])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
		console.log(tasks)
	}, [tasks])

	return (
		<VStack p={4} minH='100vh' pb={28}>
			<Heading p='5' fontWeight='extrabold' size='xl' bgGradient='linear(to-l, blue.500, green.400)' bgClip='text'>
				Majoo To-Do-List
			</Heading>
			<Tabs isFitted align='center' variant='soft-rounded'>
				<TabList>
					<Tab w='10vw' _selected={{ color: 'white', bg: 'green.400' }}>
						Active
					</Tab>
					<Tab w='10vw' _selected={{ color: 'white', bg: 'blue.500' }}>
						Archived
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<VStack minH='100vh'>
							<AddTask />
							<TaskList />
						</VStack>
					</TabPanel>
					<TabPanel>
						<VStack minH='100vh'>
							<ArchivedTask />
						</VStack>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</VStack>
	)
}

export default App
