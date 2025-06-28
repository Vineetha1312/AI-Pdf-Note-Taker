import { chatSession } from '@/configs/AIModeal';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
import { Bold, Code, Highlighter, Italic, List, Sparkles, Strikethrough, TextQuote, UnderlineIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner';

function EditorExtension({editor}) {
    const {fileId} = useParams();

    const SearchAI=useAction(api.myAction.search);
    const saveNotes=useMutation(api.notes.AddNotes)
    const {user} = useUser();

    // const onAiClick=async() => {
    //     const selectedText=editor.state.doc.textBetween(
    //         editor.state.selection.from,
    //         editor.state.selection.to,
    //         ' '
    //     )
    //     console.log("SelectedText", selectedText);

    //     const result=await SearchAI({
    //         query:selectedText,
    //         fileId:fileId
    //     })

    //     const UnformattedAns=JSON.parse(result);
    //     let AllUnformattedAnswer='';
    //     UnformattedAns&&UnformattedAns.forEach(item=>{
    //         AllUnformattedAnswer=AllUnformattedAnswer+item.pagecontent
    //     });

    //     const PROMPT="For question:"+selectedText+" and with the given content as answer,"+
    //     " please give appropriate answer in HTML format. The answer content is: "+AllUnformattedAnswer;

    //     const AiModelResult = await chatSession.sendMessage(PROMPT);
    //     console.log(AiModelResult.response.text());
    //     const FinalAns=AiModelResult.response.text().replace('```','').replace('html','');

    //     const AllText=editor.getHTML();
    //     editor.commands.setContent(AllText+'<p><strong>Answer:</strong>'+FinalAns+'</p>')

    // }

    const onAiClick = async () => {
      toast("AI is getting your answer...")
    const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        ' '
    );
    console.log("SelectedText", selectedText);

    const result = await SearchAI({
        query: selectedText,
        fileId: fileId
    });

    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAnswer = '';
    UnformattedAns && UnformattedAns.forEach(item => {
        AllUnformattedAnswer = AllUnformattedAnswer + item.pageContent;
    });

    const PROMPT = "For question:" + selectedText + " and with the given content as answer," +
        " please give appropriate answer. The answer content is: " + AllUnformattedAnswer;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
    
    // Clean up the answer - remove code blocks, HTML tags, and unnecessary text
    let FinalAns = AiModelResult.response.text()
        .replace(/```/g, '')          // Remove code block markers
        .replace(/html/g, '')          // Remove accidental html mentions
        .replace(/<[^>]*>/g, '')       // Remove all HTML tags
        .replace(/Answer:/gi, '')      // Remove duplicate "Answer:" text
        .replace(/undefined/gi, '')    // Remove undefined mentions
        .replace(/\n\s*\n/g, '\n')     // Remove empty lines
        .trim();
    
    // Remove the question if it appears at the start of the answer
    if (FinalAns.toLowerCase().startsWith(selectedText.toLowerCase())) {
        FinalAns = FinalAns.substring(selectedText.length).trim();
    }

    // Insert the cleaned answer
    const AllText = editor.getHTML();
    editor.commands.setContent(AllText + '<p><strong>Answer:</strong> ' + FinalAns + '</p>');

    saveNotes({
      notes:editor.getHTML(),
      fileId:fileId,
      createdBy:user?.primaryEmailAddress?.emailAddress
    })

  }
  return editor&&(
    <div className="p-5">
        <div className="control-group">
        <div className="button-group flex gap-3">
          {/* <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/> 
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'text-blue-500 ' : ''}
          >
            <Code/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('list') ? 'text-blue-500 ' : ''}
          >
            <List/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('textquote') ? 'text-blue-500 ' : ''}
          >
            <TextQuote/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlighter') ? 'text-blue-500 ' : ''}
          >
            <Highlighter/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-blue-500 ' : ''}
          >
            <Strikethrough/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive('strike') ? 'text-blue-500 ' : ''}
          >
            <AlignLeft/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive('strike') ? 'text-blue-500 ' : ''}
          >
            <AlignCenter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive('strike') ? 'text-blue-500 ' : ''}
          >
            <AlignRight/>
          </button>
          <button
            onClick={() => onAiClick()}
            className={'hover:text-blue-500'}
          >
            <Sparkles/>
          </button> */}
          <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold/> 
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={editor.isActive('code') ? 'text-blue-500' : ''}
                    >
                        <Code/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
                    >
                        <List/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'text-blue-500' : ''}
                    >
                        <TextQuote/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-blue-500' : ''}
                    >
                        <Strikethrough/>
                    </button>
                    <button
                        onClick={onAiClick}
                        className={'hover:text-blue-500'}
                    >
                        <Sparkles/>
                    </button>
          </div>
          </div>
    </div>
  )
}

export default EditorExtension