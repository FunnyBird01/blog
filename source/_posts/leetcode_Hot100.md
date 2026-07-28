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