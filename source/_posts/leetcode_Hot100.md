---
title: "Hot100"
categories: [leetcode]
cover: images/leetcode/cover.png
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
# 3.链表
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

            

# 4.滑动窗口
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

# 暂存区
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