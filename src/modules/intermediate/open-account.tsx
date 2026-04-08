"use client";
import Quiz from "@/components/Quiz";
export default function OpenAccount() {
  return (<>
    <h2>从注册到第一笔交易</h2>
    <p>开证券账户比你想象的简单。现在全程线上，<strong>手机+身份证+银行卡</strong>就能搞定，10分钟完成。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F3E6;</div><h3>开户流程</h3></div>
    <ul>
      <li><strong>第一步</strong> — 选券商App（华泰/中信/东财等），下载注册</li>
      <li><strong>第二步</strong> — 上传身份证正反面，做视频认证</li>
      <li><strong>第三步</strong> — 绑定银行卡（借记卡），设置交易密码</li>
      <li><strong>第四步</strong> — 等待审核（通常1个工作日），开通成功</li>
    </ul>
    <h2>新手要注意的事</h2>
    <ul>
      <li><strong>佣金要谈</strong> — 默认万3，找客户经理能谈到万1.2甚至更低</li>
      <li><strong>先开沪深A股</strong> — 创业板/科创板需要单独开通且有门槛</li>
      <li><strong>资金安全</strong> — 证券账户的钱存放在银行第三方托管，不怕券商倒闭</li>
      <li><strong>先模拟再实战</strong> — 可以先在我们的模拟交易大厅练手</li>
    </ul>
    <blockquote>选券商主要看：佣金低 + App好用 + 服务好。大券商更稳，但小券商佣金可能更便宜。</blockquote>
    <Quiz question="小张想开户炒股，他应该先做什么？"
      options={[
        { label: "直接在最火的股票上买入", feedback: "连账户都没开呢！先开户再说。而且不要追热点股票。" },
        { label: "选一家佣金合理的券商，线上开户", feedback: "对！选券商、谈佣金、线上开户，这是正确的第一步。", correct: true },
        { label: "去银行开户", feedback: "现在开证券账户不用去银行，券商App线上就能完成。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>开户全程线上，10分钟搞定</li><li>佣金一定要谈，从万3砍到万1</li><li>资金有第三方托管，安全有保障</li><li>先模拟练手再实盘</li></ul>
    </div>
  </>);
}
