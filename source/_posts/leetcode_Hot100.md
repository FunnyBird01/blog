---
title: "Hot100"
date: 2026-07-23 15:38:09
categories: [leetcode]
cover: https://cdn.jsdelivr.net/gh/FunnyBird01/hexo-images@main/img/cover.png
sticky: 1
---
# 1. 哈希
## 1. 两数之和
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

遍历数组，将数组中的元素作为键，索引作为值，存入字典中，通过是否存在键等于target-num的元素，如果存在则返回当前索引和target-num的索引。
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashtable = dict()  #创建一个字典
        for i,num in enumerate(nums):   #遍历数组,得到数组中的索引、元素
            if target - num in hashtable:   #判断字典中是否存在健=target-num
                return [hashtable[target - num],i]  #在就返回当前索引和target-num的索引
            hashtable[nums[i]]=i    #不在则添加键值对
        return[]
```

## 2. 字母异位词分组
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。 字母异位词 是由相同字母不同排列的词 例如：eat tea
```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        ans = collections.defaultdict(list)     #创建一个特殊字典，要import collections，defaultdict(list) 访问空的键会直接给你一个空列表，非常适合分组。
        for st in strs:                          #遍历字符串数组即每个单词
            key = "".join(sorted(st))             #对单词进行排序  eat tea 排序后都是aet
            ans[key].append(st)                     #将单词添加进排序后一样的字典中，defaultdict(list)自动创建一个空列表，所以可以直接append,普通字典则需要先判断字典中是否有key，没有则创建一个空列表再append
        return ans.values()                           #返回字典的值

```
## 3.最长连续序列
题目：给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
思路：将数组放入哈希表中，遍历数组，判断是否是连续序列的开始（无前一个元素），如果是则记录（找X+1）当前连续序列的长度，否则跳过。最后返回最长连续序列的长度。
```python
from typing import List
nums=input().split()
nums=list(map(int,nums))
class Solution:
    def longestConsecutive(self,nums:List[int])->int:
        nums=set(nums) #将数组放入哈希表
        ans=0
        for x in nums:
            if x-1 in nums:
                continue
            y=x+1
            while y in nums:
                y+=1
            ans=max(ans,y-x)
        return ans
a=Solution()
print(a.longestConsecutive(nums))
```

# 2. 双指针
## 1. 移动零
题目：给定一个数组 ，编写一个函数将所有0移动到数组的末尾，同时保持非零元素的相对顺序
思路：用两个指针，初始都指向第一位，一个指针遍历数组，当遍历到非零元素时，交换两个指针指向的元素，两个指针都向右移动一位
```python
class Solution:
    def movezeroes(self,nums:List[int]) -> None:
        n=len(nums)
        a=b=0
        while b<n:
            if nums[b]!=0:
                nums[a],nums[b]=nums[b],nums[a]
                a+=1
            b+=1
```
## 2. 盛最多水的容器
题目：给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。说明：你不能倾斜容器。
![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49(7*7)。
思路：双指针分别指向两端，移动短板，寻找更高的短板，更新最大水量
```python
from typing import List
height=input().split()
height=list(map(int,height))
class Solution:
    def maxArea(self,height:List[int])->int:
        n=len(height)
        i,j=0,n-1
        ans=0
        while i<j:
            ans=max(ans,min(height[i],height[j])*(j-i))
            if height[i]<height[j]:
                i+=1
            else:
                j-=1
        return ans
a=Solution()
print(a.maxArea(height))
```
## 3.三数之和
题目：给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。注意：答案中不可以包含重复的三元组。
思路：排序，对特例进行处理，再用双指针遍历数组，判断是否为三元组
```python
from typing import List
nums=input().split()
nums=list(map(int,nums))
class Solution:
    def threeSum(self,nums:List[int])->list[list[int]]:
        nums.sort()
        ans=[]
        n=len(nums)
        if n<3:
            return ans
        if nums[0]>0:
            return ans
        for i in range(n):
            if i>0 and nums[i]==nums[i-1]:  #固定第一个元素，跳过重复元素
                continue    
            L=i+1
            R=n-1
            while L<R:
                if nums[i]+nums[L]+nums[R]==0:
                    ans.append([nums[i],nums[L],nums[R]])
                    while L<R and nums[L]==nums[L+1]:
                        L+=1
                    while L<R and nums[R]==nums[R-1]:
                        R-=1
                    R-=1
                    L+=1
                elif nums[i]+nums[L]+nums[R]>0:
                    R-=1
                else:
                    L+=1
            return ans
a=Solution()
print(a.threeSum(nums))
```      
## 4.接雨水
题目：给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
思路：以最高柱子为中心，向左右扩展，计算能接的雨水量，左测跟左边最高柱子，右侧跟右边最高柱子
```python
from typing import List
height=input().split()
height=list(map(int,height))
class Solution:
    def trap(self,height:List[int])-> int:
        n=len(height)
        if n<3:
            return 0
        l,r=0,n-1
        ans=0
        max_left=height[0]
        max_right=height[-1]
        while l<r:
            if height[l]<height[r]:
                ans+=max_left-height[l]
                l+=1
                max_left=max(max_left,height[l])
            else:
                ans+=max_right-height[r]
                r-=1
                max_right=max(max_right,height[r])
        return ans
a=Solution()
print(a.trap(height))
```

# 3. 链表

## 1.相交链表
题目：给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)
图示两个链表在节点 c1 开始相交
思路：假设有一个链表长度为a，另一个链表长度为b，公共尾部为C，令a,b走完自己的在走对面的,若有相交结点则a+(b−c)=b+(a−c)，如图a=5,b=6,c=3
数学结论：无论链表是否相交，两个指针一定会相遇！ 
<span style="background:#e0f2fe;color:#0284c7;">大白话：两个人都要走完这两条路，只要相交，最后的路都一样长了，肯定会相遇</span>

```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        a,b=headA,headB
        while a!=b:
            a=a.next if a else headB
            b=b.next if b else headA
        return a
```
## 2.链表反转
题目：给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
思路：双指针，改变next
![](https://pic.leetcode.cn/1604779288-fMPcDn-Picture2.png)
```python
class solution:
    def reverseList(self,head:ListNode)->ListNode:
        a,b=head,None
        while a:
            t=a.next
            a.next=b
            b=a
            a=t
        return b
```

## 3.回文链表
题目：给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
思路：堆栈，将链表压入堆栈，然后依次弹出，判断是否相等
```python
class Solution:
    def isPalindrome(self,head:ListNode)->bool:
        stack=[]
        a=head
        while a:
            stack.append(a)
            a=a.next
        b=head
        while stack:
            c=stack.pop()
            if c.val!=b.val:
                return False
            b=b.next
        return True
```

## 4.环形链表
题目：给你一个链表的头节点 head ，判断链表中是否有环。
思路：哈希表存储，判断有无重复结点
```python
class Solution:
    def hasCycle(self,head:ListNode)->bool
        a=set()     #集合 set 本质就是去掉 value 的哈希表
        while head:
            if head in a:
                return True
            a.add(head)
            head=head.next
        return False
```

## 5.合并两个有序链表
题目：将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
思路：先选一个小的结点出来，接上剩下的递归结果
```python
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if l1 is None:
            return l2
        elif l2 is None:
            return l1
        elif l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next,l2)
            return l1
        else:
            l2.next = self,mergeTwoLists(l1,l2.next)
            return l2
```       
## 6.环形链表Ⅱ

题目： 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
思路：快慢指针，快指针走两步，慢指针走一步，当快慢针相遇时，说明有环
设入环前有a个结点，环有b个结点，第一次相遇时，快指针走了f=2s，慢指针走了s，在环内相遇又有f=s+nb，所以s=nb
想到环入口步数必须为：a+nb,所以第一次相遇后，慢指针再走a步，就到了环入口，但是不知道a的值，所以让快指针从头开始走，步长为一步，
直到再次相遇，就是环入口。
```python
class Solution:
    def detectCycle(self,head:Optional[ListNode])->Optional[ListNode]:
        fast=slow=head
        while True:
            if not (fast and fast.next):    #[]的情况
                return None
            fast=fast.next.next
            slow=slow.next
            if fast==slow:
                break
        fast=head
        while fast!=slow:
            fast=fast.next
            slow=slow.next
        return fast
```
## 7.两数相加
题目：给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
思路：模拟
```python
class Solution:
    def addTwoNumbers(self,l1:Optional[ListNode],l2:Optional[ListNode],carry=0)->Optional[ListNode]:
        if l1 is None and l2 is None and carry==0:
            return None
        s+=carry    #上一位的进位值
        if l1:
            s+=l1.val
            l1=l1.next
        if l2:
            s+=l2.val
            l2=l2.next
        return ListNode(s%10,self.addTwoNumbers(l1,l2,s//10))    #当前位的值，下一位的进位值
```

## 8.删除链表倒数第n个结点
题目：给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点
思路：双指针，快指针走n步，慢指针走，当快指针走到头时，慢指针就走到倒数第n个结点，删除慢指针的下一个结点
```python
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        left = right = dummy = ListNode(next=head)
        for _ in range(n):
            right = right.next  # 右指针先向右走 n 步
        while right.next:
            left = left.next
            right = right.next  # 左右指针一起走
        left.next = left.next.next  # 左指针的下一个节点就是倒数第 n 个节点
        return dummy.next
```
## 9.两两交换链表中的节点
题目：给你一个链表，两两交换其中相邻的结点，并返回交换后的链表。
思路：迭代，交换当前结点和下一个结点，直到到达链表的末尾
```python
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:# 
        node0=temp=ListNode(next=head) #0 1 2 3 4 5 6 7 8
        node1=head  #要 0 1   
        while node1 and node1.next:     

            node2=node1.next    #拿出2，3
            node3=node2.next

            node2.next=node1    #1，2交换
            node1.next=node3
            node0.next=node2

            node0=node1     #0 2 1 3 4，交换3，4，就要3和3的前面即1，3
            node1=node3
        return temp.next
```

## 10.随机链表的复制
题目：给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。
构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。
思路：在每个节点后面插入一个新节点，新节点的值与原节点相同，新节点的 next 指针指向原节点的 next 指针，新节点的 random 指针指向原节点的 random 指针的next
```python
class Solution:
    def copyRandomList(self,head: 'Optional[ListNode]') -> 'Optional[ListNode]':
        cur=head
        while cur:
            cur.next=ListNode(cur.val,cur.next)    #在每个节点后面插入一个新节点
            cur.next.random=cur.random
            cur=cur.next.next
        cur=head
        while cur:
            if cur.random:      #新节点的random指针指向原节点的random指针的next
                cur.next.random=cur.random.next
            cur=cur.next.next
        cur=temp=Node(0,head)
        while cur.next:      #将新节点从原链表中分离出来，遍历老节点
            cur.next=cur.next.next  #
            cur=cur.next
        return temp.next
```

## 11.排序链表
题目：给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
思路：归并排序
```python
class Solution:
    def merge(self,first:Optional[ListNode],second:Optional[ListNode]):
        temp=ListNode(0)
        tail=temp
        while first and second:
            if first.val<second.val:    #小的先放
                tail.next=first
                first=first.next
            else:
                tail.next=second
                second=second.next
            tail=tail.next  #tail指向新链表的最后一个节点
        if first:
            tail.next=first  #将链表剩余部分直接连接到新链表的末尾
        else:
            tail.next=second
        return temp.next
    def sortList(self,head: Optional[ListNode])->Optional[ListNode]:
        if head is None or head.next is None: #链表为空或只有一个节点，直接返回
            return head
        slow,fast=head,head.next #顺序不能反
        while fast and fast.next:# 快指针走两步，慢指针走一步，当快指针走到头时，慢指针就走到中间 1 2 3 4
            slow=slow.next
            fast=fast.next.next
        second=slow.next    #第二个链表的头节点
        slow.next=None    #断开链表，将链表分为两个部分
        first=head
        first=self.sortList(first)
        second=self.sortList(second)
        return self.merge(first,second)
```
## 12.LRU缓存
题目：请你设计并实现一个满足  LRU (最近最少使用) 缓存约束的数据结构。
思路：使用哈希表和双向链表实现LRU缓存。哈希表用于快速查找缓存中的节点，双向链表用于维护缓存中的节点顺序。
```python
class Solution:
    def __init__(self,capacity:int):
        self.capacity=capacity
        self.cache=OrderedDict()#dict+双向链表 （标准库）,from collections import OrderedDict


    def get(self,key:int)->int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key,last=False)#将key移动到双向链表的头，表示最近使用
        return self.cache[key]

    def put(self,key:int,value:int)->None:
        self.cache[key]=value
        self.cache.move_to_end(key,last=False)#将key移动到双向链表的头，表示最近使用
        if len(self.cache)>self.capacity:
            self.cache.popitem()#删除双向链表的第一个节点，即最近最少使用的节点，释放缓存空间,`popitem()` 默认 `last=True`，弹出**最后加入（最末尾）**；
```
不用标准库实现LRU缓存
```python
class Node:
    __slots__='key','value','prev','next' #属性直接存到一块连续固定内存里，不用哈希表。
    def __init__(self,key=0,value=0):
        self.key=key
        self.value=value
class Solution:
    def __init__(self,capacity:int):
        self.dummy=Node()
        self.dummy.prev=self.dummy
        self.dummy.next=self.dummy
        self.key_map={}
    
    def get_node(self,key:int)->Optional[Node]:
        if key not in self.key_map:
            return None
        node=self.key_map[key]
        self.remove_node(node)
        self.add_node(node)
        return node
    def get(self,key:int)->int:
        node=self.get_node(key)
        if node is Node:
            return -1
        return node.value
    def put(self,key:int,value:int)->None:
        node=self.get_node(key) #看有没有，如果有，更新值，并且自动放到前面，没有，创建新节点
        if node:
            node.value=value
            return
        self.key_map[key]=node=Node(key,value)
        self.add_node(node)
        if len(self.key_map)>self.capacity:
            back_node=self.dummy.prev
            del self.key_map[back_node.key]
            self.remove_node(back_node)
    def remove_node(self,node:Node): #删除节点
        node.prev.next=node.next
        node.next.prev=node.prev
    def add_node(self,node:Node): #只插入，不管后面
        node.prev=self.dummy
        node.next=self.dummy.next
        self.dummy.next.prev=node
        self.dummy.next=node
```
# 4. 二叉树

## 1.二叉树的中序遍历
题目：给定一个二叉树的根节点 root ，返回它的 中序 遍历。
思路：递归，左子树->根节点->右子树
```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        if root is None:
            return []
        return self.inorderTraversal(root.left)+[root.val]+self.inorderTraversal(root.right)    #拼接：左子树->根节点->右子树
```
优化：使用栈的迭代，将递归转换为循环
```python
class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        if root is None:
            return []
        stack=[]
        res=[]
        a=root
        while a or stack:
            while a:
                stack.append(a)
                a=a.left
            a=stack.pop()
            res.append(a.val)
            a=a.right
        return res
```
## 2.二叉树的最大深度
题目：给定一个二叉树的根节点 root ，返回该最大深度。
![](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)
> 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

思路：递归，左子树+右子树+根节点
```python
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if root is None:
            return 0
        return max(self.maxDepth(root.left),self.maxDepth(root.right))+1
```

## 3.翻转二叉树
题目：翻转一棵二叉树，将树的每个节点的左子树和右子树交换。
![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)
思路：递归，交换每个节点的左子树和右子树
```python
class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root is None:
            return None
        root.left,root.right=self.invertTree(root.right),self.invertTree(root.left)
        #Python 执行多变量赋值永远遵守：先把等号右边所有函数全部运算完毕，之后再赋值左侧属性
        return root
```

## 4.对称二叉树
题目：给你一个二叉树的根节点 root，检查它是否轴对称。
！[](https://pic.leetcode.cn/1698026966-JDYPDU-image.png)
思路：递归，判断左子树和右子树是否对称
```python
class Solution:
    def isSymmetric(self,root: Optional[TreeNode])->bool:
        if not root:
            return True
        def ifmirror(left,right):
            if not left and not right:
                return True
            if not left or not right or left.val!=right.val:
                return False
            return ifmirror(left.left,right.right) and ifmirror(left.right,right.left)
        return ifmirror(root.left,root.right)
```

## 5.将有序数组转换为二叉搜索树
题目：给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。
> 平衡二叉搜索树是一棵二叉搜索树，其高度平衡的定义是：每个节点的左右两个子树的高度差的绝对值不超过 1 。

> 搜索树：每个节点，左边所有小孩全都比它小；右边所有小孩全都比它大

思路：递归，将数组的中间元素作为根节点，左子树为数组的前半部分，右子树为数组的后半部分
```python
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
        if not nums:
            return None
        mid=len(nums)//2
        root=TreeNode(nums[mid])
        root.left=self.sortedArrayToBST(nums[:mid])
        root.right=self.sortedArrayToBST(nums[mid+1:])
        return root
```
## 6.二叉树的直径
题目：给你一棵二叉树的根节点，返回该树的 直径 。
二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。
两节点之间路径的长度由它们之间边数表示。
思路：递归，计算每个节点的左子树和右子树的高度，更新最大直径。
```python
class Solution:
    def diameterOfBinaryTree(self, root: TreeNode) -> int:
        ans=0
        def dfs(node:Optional[TreeNode])->int:
            if node is None:
                return 0
            l_len=dfs(node.left)
            r_len=dfs(node.right)
            nonlocal ans #可以修改外层的 ans。
            ans=max(ans,l_len+r_len)
            return max(l_len,r_len)+1
        dfs(root)
        return ans
```
举个生活例子：
想象你站在一个路口（当前节点）
- 往左最远能走几步：`l_len`
- 往右最远能走几步：`r_len`
- **从左边最远点→经过你→走到右边最远点**，这条路的总长度 = `l_len + r_len`
这条路就有可能是整棵树最长的那条直径！
但是！你向上汇报给你的爸爸时，**你不能同时报左边 + 右边两条路**。爸爸只能顺着一条路往下走，所以只能选更长那一条上报：`max(l_len,r_len)+1`

## 7.二叉树的层序遍历
题目：给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
思路：使用队列，将根节点入队，每次出队一个节点，将其左右子节点入队，直到队列为空。
```python
from collections import deque
class Solution:
    def levelOrder(self,root:Optional[TreeNode])->List[List[int]]:
        if not root:    #拦截空树
            return []
        res=[]
        queue=collections.deque()#双端队列
        queue.append(root)
        while queue:
            temp=[]
            for i in range(len(queue)): #遍历当前层的所有节点，将其左右子节点入队，同时将当前层的节点值加入 temp 中
                node=queue.popleft()   #：弹出队列最左边的元素（先进先出，队列特性 FIFO）。
                temp.append(node.val)#有多少个节点，就加入多少个节点值
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
                res.append(temp)
        return res
```
## 8.验证二叉搜索树
题目：给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
有效 二叉搜索树定义如下：
- 节点的左子树只包含 严格小于 当前节点的数。
- 节点的右子树只包含 严格大于 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。
```python
class Solution:
    def isValidBST(self,root:Optional[TreeNode],left=-inf,right=inf)->bool:
        if not root:
            return True
        x=root.val
        return left<x<right and self.isValidBST(root.left,left,x) and self.isValidBST(root.right,x,right)
```
## 9.二叉搜索树中第k小的元素
题目：给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 小的元素（k 从 1 开始计数）。
思路：二叉搜索树具有一个重要性质：二叉搜索树的中序遍历为递增序列。
```python
class Solution:
    def kthSmallest(self,root:Optional[TreeNode],k:int)->int:
        res=0
        cnt=k
        def dfs(root):
            nonlocal res,cnt
            if not root:
                return 
            dfs(root.left)
            if cnt==0:
                return
            cnt-=1
            if cnt==0:
                res=root.val
            dfs(root.right)
        dfs(root)
        return res
```
## 10.二叉树的右视图
题目：给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
思路：参考二叉树的层序遍历，取每层最后的一个点
```python
class Solution:
    def rightSideView(self,root:Optional[TreeNode])->List[int]:
        res=[]
        if not root:
            return []
        cur=[root]
        while cur:
            res.append(cur[-1].val)
            next1=[]
            for node in cur:
                if node.left:
                    next1.append(node.left)
                if node.right:
                    next1.append(node.right)
            cur=next1
        return res
```
## 11.二叉树展开为链表
题目：给你二叉树的根节点 root ，请你将它展开为一个单链表：
- 左子树指针始终为 null
- 右子树指针指向链表中下一个节点
- 展开后的单链表应该与二叉树先序遍历顺序相同。
思路：

        
# 5. 二分查找

## 1.搜索插入位置
题目：给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

```python
#内置库
class Solution:
    def searchInsert(self,nums:List[int],target:int)->int:
        return bisect_left(nums,target)

#二分查找
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums)
        while l < r:
            mid = (l + r) // 2
            if nums[mid] < target:
                l = mid + 1
            else:
                r = mid
        return l
```

# 6. 滑动窗口
## 1. 最长无重复子串
给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。
思路：使用滑动窗口，窗口内无重复字符则更新最大长度，有重复字符则移动窗口的左边界，直到无重复字符。
白话：我们维护一个窗口 [left, right]，满足硬性规则：✅ 窗口内所有字符，不存在重复，right 一直往右走（正常遍历字符串）；一旦发现当前字符char已经存在窗口里面：就要把窗口左边界left挪到【上一次这个字符位置的下一位】，把旧的重复字符踢出窗口。
abca
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        dic,res,i={},0,-1
        for j in range(len(s)):   #取长度记得用len
            if s[j] in dir:
                i=max(i,dic[s[j]])
            dic[s[j]]=j
            res=max(res,j-i)
        return res
sol = Solution()
s = input("请输入字符串：")
print(sol.lengthOfLongestSubstring(s))
```
## 2.找到字符串中所有字母异位词
题目：给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
思路：滑动窗口，用字典统计字符个数是否相同
 ```python
 from collections import Counter #统计字符个数
 from typing import List
 s=input()
 p=input()
 class Solution:
    def findAnagrams(self,s:str,p:str)->List[int]:
        dic_p=Counter(p)   #Counter 是 dict 的子类，本质就是一个普通 Python 字典 {字符:出现次数},为空也不报错
        dic_s=Counter()   
        ans=[]
        for right, c in enumerate(s):   #right为索引，c为字符
            dic_s[c]+=1
            left =right-len(p)+1  #right-left+1=窗口大小
            if left <0:
                continue
            if dic_s==dic_p:
                ans.append(left)
            dic_s[s[left]]-=1   #字典里是放key，不是value
        return ans
```

# 7. 栈

## 1. 有效的括号

题目：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效：左与右相同闭合，且必须以正确顺序闭合。
思路：用栈存储，是左括号就入栈，不是括号就弹出，最后判断栈是否为空
```python
s=input("请输入字符串：")
class Solution:
    def isValid(self, s:str)->bool:
        dic={'(':')','[':']','{':'}'}
        stack=[]
        for c in s:
            if c in dic:
                stack.append(c)
            elif not stack :
                return False
            elif dic[stack.pop()]!=c:  #栈空的时候绝对不能 pop
                return False
        return not stack
a=Solution()
print(a.isValid(s))
```
# 8. 贪心算法
## 1.买卖股票的最佳时机
题目：给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
思路：记录最低价格，每次更新最低价格，计算利润，更新最大利润
```python
prices=input("请输入股票价格：")
prices=list(map(int,prices.split()))
#map:将字符串转换为整数=for s in  str_list: prices.append(int(s))   #一个个转，map可以批量
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price=prices[0]
        res=0
        for price in prices:
            min_price=min(min_price,price)
            profit=price-min_price
            res=max(profit,res)
        return res
a=Solution()
print(a.maxProfit(prices))
```
# 9. 动态规划

## 1.爬楼梯
题目：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
思路：动态规划，dp[i]表示第i阶的方法数，dp[i]=dp[i-1]+dp[i-2]，初始条件dp[0]=1,dp[1]=1,dp[2]=2
> 大白话：一次只能爬1阶或2阶，所以爬到第i阶的方法数为爬到第i-1阶的方法数加上爬到第i-2阶的方法数。
```python
n=int(input())
class Solution:
    def climbStairs(self, n: int) -> int:
        if n<=2:
            return n
        dp=[1,1,2]  #0阶有1种方法，1阶有1种方法，2阶的方法数为2
        for i in range(3,n+1):
            dp.append(dp[i-1]+dp[i-2])  #列表写死，只能用append方法添加元素
        return dp[n]
a=Solution()
print(a.climbStairs(5))
```
## 2.杨辉三角
题目：给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
思路：动态规划，dp[i]表示第i行的元素，dp[i][j]=dp[i-1][j-1]+dp[i-1][j]，初始条件dp[0][0]=1,dp[1][0]=1,dp[1][1]=1
> 大白话：把结果数组左对齐，发现第一列和最后一列都是1，其他元素都是上和左上的元素之和。
```python
numRows=int(input())
class Solution:
    def generate(self,numRows: int)-> List[List[int]]:
        c= [[1]*(i+1)for i in range(numRows)]  #初始化杨辉三角全为1
        for i in range(2,numRows):
            for j in range(1,i):
                c[i][j]=c[i-1][j-1]+c[i-1][j]
        return c
a=Solution()
print(a.generate(numRows))
```

# 10. 技巧算法

# 11.子串
## 1.和为k的子数组
题目：给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。子数组是数组中元素的连续非空序列。
思想：前缀和（s[0]=0,就不用对第一天特殊处理），记录每个元素的前缀和，用前缀和的差来判断是否有和为k的子数组，写成 s[j]+(−s[i])=k 就能看得更明白。优化：两数之和：哈希
```python
nums=input().split()
nums=list(map(int,nums))
k=int(input())
class Solution:
    def subarraySum(self,nums:List[int])->int:
        cnt=defaultdict(int)
        cnt[0]=1 #前缀和为0初始为1次，因为s[0]=0
        ans=s=0
        for num in nums:
            s+=num #当前位置前缀和
            ans+=cnt[s-k]   #查询有没有前缀和为s-k（离k还有多少）的子数组，有则加1，没有则加0
            cnt[s]+=1    #当前前缀和为s的次数加1
        return ans
a=Solution()
print(a.subarraySum(nums))
```



## 1.只出现一次的数字
题目：给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
思路：用异或运算，相同为0，不同为1，所以所有元素异或起来，结果就是只出现了一的元素
```python
nums=input()
nums=list(map(int,nums.split()))
class Solution:
    def singleNumber(self,nums:List[int])->int:
        res=0
        for num in nums:
            res^=num
        return res
a=Solution()
print(a.singleNumber(nums))
```
## 2.多数元素
题目：给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
思路：摩尔投票法，记录众数为1，其他元素为-1，则一定有所有数字的 票数和 >0 ，则若a个数组中票数为0，则剩余的的数组中还有众数
利用此特性，每轮假设发生 票数和 =0 都可以 缩小剩余数组区间 。当遍历完成时，最后一轮假设的数字即为众数。
```python
nums=input()
nums=list(map(int,nums.split()))
class Solution:
    def majorityElement(self,nums:List[int])->int:
        vote =0
        for num in nums:
            if vote==0:
                res=num
            if res==num:
                vote+=1
            else:
                vote-=1
        return res
a=Solution()
print(a.majorityElement(nums))
```


# 12. 普通数组
## 1.最大子数组和
题目：给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。子数组是数组中的一个连续部分。
思想：前缀和
```python
nums=input().split()
nums=list(map(int,nums))
class Solution:
    def maxSubArray(self,nums:List[int])->int:
        ans=nums[0]
        s=0
        min_s=0 #初始最小前缀和为0，因为s[0]=0，所以s[0]-min_s=s[0]，就是s[0]的和
        for num in nums:
            s+=num
            ans=max(ans,s-min_s)    #当前前缀和与最小前缀和的差，就是当前子数组的和
            min_s=min(min_s,s)
        return ans
```
## 2.合并区间
题目：以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
思路：先按区间起点排序，然后遍历区间，对当前其间左端点小于等于上一个区间的右端点的，则合并为一个区间，否则直接加入结果数组。
```python
from typing import List
intervals=[]
for i in range(int(input())):
    a,b=map(int,input().split())
    intervals.append([a,b])
class Solution:
    def merge(self,intervals:List[List[int]])->List[List[int]]:
        intervals.sort(key=lambda x:x[0]) #按区间起点排序
        res=[]
        for p in intervals:
            if res and res[-1][1]>=p[0]:    #当前区间左端点小于等于上一个区间的右端点，说明有重叠
                res[-1][1]=max(res[-1][1],p[1])    #合并区间，右端点取较大值
            else:
                res.append(p)
        return res
a=Solution()
print(a.merge(intervals))
```
## 3.轮转数组
题目：给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
思路：先将数组反转，再将前k个元素反转，最后将后n-k个元素反转。（交换子数组）
```python
nums=input().split()
nums=list(map(int,nums))
k=int(input())
class Solution:
    def rotate(self,nums:List[int],k:int)->None:
        k=k%len(nums)
        # nums[:k].reverse()    用切片会生成一个新的列表，不是原地修改
        nums[:]=nums[n-k:]+nums[:n-k]
a=Solution()
a.rotate(nums,k)
```
## 4.除了自身以外的数组乘积
题目：给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除了 nums[i] 之外其余各元素的乘积 。
题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在 32 位 整数范围内。
请不要使用除法，且在 O(n) 时间复杂度内完成此题。（用不了暴力前缀和，除法：总乘积除以当前元素，就是当前元素的乘积）
思路：先计算前缀积，再计算后缀积，最后相乘。
```python
nums=input().split()
nums=list(map(int,nums))
class Solution:
    def productExceptSelf(self,nums:List[int])->List[int]:
        ans,tep=[1]*len(nums),1
        for i in range(1,len(nums)): #从第二个元素开始，前缀积为1
            ans[i]=ans[i-1]*nums[i-1]
        for i in range(len(nums)-2,-1,-1): #从倒数第二个元素开始，后缀积为1,步长为-1，（逆序遍历）
            tep*=nums[i+1]
            ans[i]*=tep
        return ans
```

# 13.矩阵
## 1.矩阵置零
题目：给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
> 原地算法：不额外开辟一个完整的新数组 / 新矩阵，直接在原来输入的矩阵上修改，额外空间复杂度O(1)，只用几个临时变量。
思路：先用两个变量记录第一行和第一列是否要置零的信息，第一行和第一列记录其他元素是否要置零的信息。
```python
class Solution:
    def setZeroes(self,matrix:List[List[int]])->None:
        m,n=len(matrix),len(matrix[0])
        first_row= 0 in matrix[0]    #第一行是否有0
        first_col= any(row[0]==0 for row in matrix)     #第一列是否有0
        for i in range(1,m):
            for j in range(1,n):
                if matrix[i][j]==0: 
                    matrix[i][0]=0      #将当前元素所在行的第一个元素设为0
                    matrix[0][j]=0      #将当前元素所在列的第一个元素设为0
        for i in range(1,m):
            for j in range(1,n):
                if matrix[i][0]==0 or matrix[0][j]==0:
                    matrix[i][j]=0
        if first_row:       #单独处理第一行
            for j in range(n):
                matrix[0][j]=0
        if first_col:       #单独处理第一列
            for row in matrix:
                row[0]=0
```
## 2.螺旋矩阵
题目：给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
思路：边界控制，每次循环控制一个方向，直到边界重合。
```python
class Solution:
    def spiralOrder(self,matrix:List[List[int]])->List[int]:
        if not matrix:
            return []
        m,n=len(matrix),len(matrix[0])
        res=[]
        top,bottom,left,right=0,m-1,0,n-1   #上、下、左、右边界
        while True:
            for i in range(left,right+1):
                res.append(matrix[top][i])
            top+=1  #上边界收缩
            if top>bottom:
                break
            for i in range(top,bottom+1):
                res.append(matrix[i][right])
            right-=1  #右边界收缩
            if left>right:
                break
            for i in range(right,left-1,-1):
                res.append(matrix[bottom][i])
            bottom-=1  #下边界收缩
            if top>bottom:
                break
            for i in range(bottom,top-1,-1):
                res.append(matrix[i][left])
            left+=1  #左边界收缩
            if left>right:
                break
        return res
```
## 3.螺旋图像
题目：给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
思路：4个数字进行交换，四个角的数字交换，利用临时变量存储。
![](https://pic.leetcode.cn/1638557961-BSxFQQ-ccw-01-07.002.png)
```python
class Solution:
    def rotate(self,matrix:List[List[int]])->None:
        n=len(matrix)
        for i in range(n//2):
            for j in range((n+1)//2):
                temp=matrix[i][j]
                matrix[i][j]=matrix[n-j-1][i]   #A=D
                matrix[n-1-j][i]=matrix[n-1-i][n-1-j]   #D=C
                matrix[n-1-i][n-1-j]=matrix[j][n-1-i]   #C=B
                matrix[j][n-1-i]=temp   #B=A
```

## 4.搜索二维矩阵Ⅱ
题目：编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。
思路：看左下角或右上角，能发现所在列或行一个升序一个是降序，比较判断不在哪列或行，再继续比较。
```python
class Solution:
    def searchMatrix(self,matrix:List[List[int]],target:int)->bool:
        if not matrix:
            return False
        m,n=len(matrix),len(matrix[0])
        i,j=m-1,0
        while i>=0 and j<n:
            if matrix[i][j]==target:
                return True
            elif matrix[i][j]>target:
                i-=1
            else:
                j+=1
        return False
# 11. 暂存区

## 合并两个有序数组
给定两个有序数组 nums1 和 nums2 ，将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
```python
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        p1,p2,p=m-1,n-1,m+n-1
        while p2>=0:
            if p1>=0 and nums1[p1] >nums2[p2]:
                nums1[p]=nums1[p1]
                p1-=1
            else:
                nums1[p]=nums2[p2]
                p2-=1
            p-=1
```
## 去除驼峰子串
给一个字符串，去除其中所有驼峰子串，并返回剩余的字符串。
思路：用栈存储，是驼峰就弹出，不是驼峰就入栈
```python
class Solution:
    def remove(self, s: str) -> str:
        stack=[]
        for c in s:
            stack.append(c)
            if len(stack)>=3：
                if stack[1]==stack[3] and stack[1]!=stack[2]:
                    stack.pop()
                    stack.pop()
                    stack.pop()
        return "".join(stack)
```

{% note warning %}
⚠️ Warning
这部分最好电脑浏览，大量的 Latex 语法会超出手机屏幕，而且内容体量过大，手机较卡顿
{% endnote %}

{% note success %}
**考试信息**：07-10 16:20-18:00 | 闭卷 | 05307D
**题型**：共七道大题 —— 简答题 + 计算题 + 编程题，无选择题，可带计算器。
**注意**：该部分内容由 AI 根据上面的相关文件以及 [算法分析复习指南.md] 生成和拓展，不对内容的准确度做 100% 保证。
{% endnote %}

<details>
<summary>复习摘要</summary>

填写折叠里面的文本

</details>