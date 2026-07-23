---
title: "Hot100"
categories: [leetcode]
cover: images/leetcode/cover.png
---
# 1. 哈希
## 1. 两数之和
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

遍历数组，将数组中的元素作为键，索引作为值，存入字典中，通过是否存在键等于target-num的元素，如果存在则返回当前索引和target-num的索引。
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashtable = dict()#创建一个字典
        for i,num in enumerate(nums):#遍历数组,得到数组中的索引、元素
            if target - num in hashtable:#判断字典中是否存在健=target-num
                return [hashtable[target - num],i]#在就返回当前索引和target-num的索引
            hashtable[nums[i]]=i#不在则添加键值对
        return[]
```
