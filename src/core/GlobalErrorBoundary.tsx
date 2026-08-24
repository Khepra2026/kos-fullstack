import React from 'react';
export default class GlobalErrorBoundary extends React.Component<any, any> {
  state = { hasError:false, error:null as any, stack:'' };
  static getDerivedStateFromError(e:any){ return { hasError:true, error:e, stack:e.stack||'' } }
  componentDidCatch(e:any, info:any){ console.error('🔥 [content-routes] REAL ERROR:', e, e.stack, info.componentStack); }
  render(){
    if(this.state.hasError){
      return <div style={{padding:20,background:'#fee'}}><h1>REAL ERROR</h1><p>{this.state.error?.message}</p><pre style={{whiteSpace:'pre-wrap'}}>{this.state.stack}</pre></div>
    }
    return this.props.children;
  }
}
