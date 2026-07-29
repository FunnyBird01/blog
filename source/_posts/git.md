---
title: "MySQL"
categories:
  - 开发必备
cover: "https://cdn-icons-png.flaticon.com/128/6577/6577287.png"
---

# Git常用指令

## 初始化

git init        #初始化仓库


git config --global user.name "你的名字"        # 配置用户名/邮箱（只需要第一次用）
git config --global user.email "你的邮箱"

git remote add origin 你的远程仓库地址        # 绑定远程仓库

git remote -v       # 查看远程仓库

## 日常提交
git add .       # 添加所有文件到暂存区
git commit -m "提交信息"    # 提交到本地仓库
git push       # 推送到远程仓库（已经绑过）

## 分支管理

查看所有分支
git branch

新建分支
git branch 分支名

切换分支
git checkout 分支名
git switch 分支名    # 新版推荐

新建并切换
git checkout -b 分支名
git switch -c 分支名

合并分支（比如把 dev 合并到 main）
git checkout main
git merge dev

删除分支
git branch -d 分支名