<script lang="ts">
	import ChatMessageBar from "$lib/components/ChatMessageBar.svelte";
	import IconButton from "$lib/components/IconButton.svelte";
	import UserList from "$lib/components/UserList.svelte";
	import UserSelfProfileCard from "$lib/components/UserSelfProfileCard.svelte";

  let chats: {
    username: string;
    lastMessage: string;
    lastSpoke: string;
    unreadCount: number;
    profilePicture: string;
    received: boolean;
    read: boolean;
    lastSeen: string;
  }[] = [
    {
      username: "Alice",
      lastMessage: "Hey! How are you doing?",
      lastSpoke: "2 min",
      unreadCount: 2,
      profilePicture: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Alice",
      received: true,
      read: false,
      lastSeen: "recently"
    },
    {
      username: "Bob",
      lastMessage: "You: Thanks for your help earlier!",
      lastSpoke: "1 hour",
      unreadCount: 0,
      profilePicture: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Bob",
      received: true,
      read: false,
      lastSeen: "5 hours ago"
    },
    {
      username: "Charlie",
      lastMessage: "See you tomorrow!",
      lastSpoke: "3 hours",
      unreadCount: 5,
      profilePicture: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Charlie",
      received: false,
      read: false,
      lastSeen: "8 hours ago"
    },
    {
      username: "Diana",
      lastMessage: "Did you get my email?",
      lastSpoke: "Yesterday",
      unreadCount: 1,
      profilePicture: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Diana",
      received: true,
      read: false,
      lastSeen: "10 days ago"
    },
    {
      username: "Eve",
      lastMessage: "You: Perfect, that works for me",
      lastSpoke: "2 days",
      unreadCount: 0,
      profilePicture: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Eve",
      received: true,
      read: true,
      lastSeen: "4 hours ago"
    }
  ];

  let activeChat = $state(0);
</script>
<div class="flex p-4 pb-0 gap-4 h-screen overflow-hidden">
  <div class="flex flex-col gap-3 w-100">
    <UserSelfProfileCard/>
    <UserList {chats} bind:activeChat/>
  </div>
  <div class="flex flex-col gap-3 w-full">
    <div class="flex items-center">
      <div class="flex-1 flex flex-col justify-center">
        <span class="text-home-lighter text-xs font-bold">{chats[activeChat].username}</span>
        <span class="text-home-light text-xs">Last seen {chats[activeChat].lastSeen}</span>
      </div>
      <div class="flex justify-end gap-1">
        <IconButton icon="magnifying-glass"/>
        <IconButton icon="dots-three"/>
      </div>
    </div>

    <div class="flex-1 bg-home-dark rounded-t-2xl relative">
      <ChatMessageBar class="bottom-0 left-0 right-0 absolute"/>
    </div>
  </div>
</div>