import { uploadOne } from '@/utils/fetch';
import { Button, Card } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { useState } from 'react';

export default props => {
  const { html, onSave } = props;
  const [editorRef, setEditorRef] = useState(null);

  const onMediaUpload = async context => {
    if (!context || !context.file) return;

    const res = await uploadOne(context.file);

    if (!!res && res.relativePath) {
      context.progress(101);
      context.success({ url: res.relativePath });
    } else {
      context.error({ error: '上传失败' });
    }
  };

  const toSave = () => {
    onSave(editorRef.getValue().toHTML());
  };

  const defaultProps = {
    contentFormat: 'html',
    value: BraftEditor.createEditorState(html),
    onSave: toSave,
    media: {
      uploadFn: onMediaUpload,
    },
  };

  return (
    <Card bordered={false} style={{ marginTop: 10 }} bodyStyle={{ padding: '0 10px' }}>
      <Button type="primary" style={{ marginBottom: 10 }} onClick={() => toSave()}>
        保存
      </Button>
      <BraftEditor ref={e => setEditorRef(e)} {...defaultProps} />
    </Card>
  );
};
