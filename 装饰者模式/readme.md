定义：给对象动态地增加职责的方式称为装 饰者（decorator）模式。装饰者模式能够在不改 变对象自身的基础上，在程序运行期间给对象 动态地添加职责。跟继承相比，装饰者是一种 更轻便灵活的做法，这是一种“即用即付”的 方式。

示例：数据统计上报

小结：
优点：
  状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态 类，很容易增加新的状态和转换。 
  避免 Context无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context中原本过 多的条件分支。 
  用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。 
  Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响
缺点：会在系统中定义许多状态类，编写 20 个状态类是一项枯燥乏味的工作， 而且系统中会因此而增加不少对象。另外，由于逻辑分散在状态类中，虽然避开了不受欢迎的条 件分支语句，但也造成了逻辑分散的问题，我们无法在一个地方就看出整个状态机的逻辑。 