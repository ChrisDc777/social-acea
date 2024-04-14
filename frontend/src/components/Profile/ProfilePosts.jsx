import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
// import useGetUserPosts from "../../hooks/useGetUserPosts";
import useShowToast from "../../hooks/useShowToast";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import postsAtom from "../../atoms/postsAtom";
import { useParams } from "react-router-dom";

const ProfilePosts = () => {
	// const { isLoading, posts } = useGetUserPosts();
	const { user, loading } = useGetUserProfile();
	const { username } = useParams();
	const showToast = useShowToast();
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [fetchingPosts, setFetchingPosts] = useState(true);
	console.log("posts", username);
	useEffect(() => {
		const getPosts = async () => {
			if (!user) return;
			setFetchingPosts(true);
			try {
				const res = await fetch(`/api/posts/user/${username}`);
				if (!res.ok) {
					throw new Error('Failed to fetch posts');
				}
				const data = await res.json();
				
				setPosts(data);
				
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
				console.log("data", data);
			}
		};
		
		getPosts();
	}, [username, showToast, setPosts, user]);

	const noPostsFound = !fetchingPosts && posts.length === 0;
	// console.log("posts", posts);
	// console.log("fetchingPosts", fetchingPosts);
	if (noPostsFound) return <NoPostsFound />;

	return (
		<Grid
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
			{/* {fetchingPosts &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={4}>
						<Skeleton w={"full"}>
							<Box h='300px'>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))} */}

			{fetchingPosts && (
				<>
					{posts.map((post) => (
						<ProfilePost post={post} key={post._id} />
					))}
				</>
			)}
		</Grid>
	);
};

export default ProfilePosts;

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};
