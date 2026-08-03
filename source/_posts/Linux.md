---
title: Linux
categories:
- 开发必备
cover: "https://cdn-icons-png.flaticon.com/128/15465/15465695.png"
---
# linxu
Linux 是一款免费、开源的操作系统内核，和 Windows、macOS 一样，用来管理电脑硬件、运行软件。

# 操作命令
## 文件目录
ls - 列出当前目录下的所有文件和文件夹
ls -l - 列出当前目录下的所有文件和文件夹的详细信息
mkdir - 创建一个目录      mkdir directory_name
rm - 删除文件             
rmdir - 删除一个空目录
mv - 移动或重命名文件
cp - 复制文件
touch - 创建一个空文件
pwd - 显示当前目录的路径
cd - 改变当前目录
## 系统操作
whoami - 显示当前用户名
date - 显示当前日期和时间
top - 显示当前正在运行的进程
ps - 显示当前正在运行的进程
kill - 杀死一个进程
man - 显示命令的帮助文档
sudo - 运行一个命令 elevated privileges
chmod - 修改文件权限
chown - 修改文件所有者
find - 搜索文件
clear - 清空屏幕
echo - 输出字符串
## 文件查看
cat - 显示文件的内容
tail -f train.log    # 实时看训练日志

## GPU相关
nvidia-smi           # 查看显卡显存、占用
watch -n 1 nvidia-smi # 每秒刷新显卡状态

## 训练
screen -s train
 进入后执行训练脚本，Ctrl+A+D后台挂起
screen -r  # 恢复会话