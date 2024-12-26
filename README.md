
## 运行项目

```bash
$ pnpm install
$ pnpm run start:dev
```
## 接口返回格式
统一如下格式，没有外层的data，故只需res.data即可，不用res.data.data
```{
  "code": 0,
  "data": {},
  "message": "请求成功"
}
```
## 吐槽
API设计仅为搭配大事件前端使用
吐槽点:
1.API设计完全不符合RESTful规范
2.删除分类好好的Param传参不用非要用Query传参,不知道什么脑回路
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
