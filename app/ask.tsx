import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, FlatList, Text } from 'react-native';
import { OpenAI } from 'openai';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import secrets from '../secrets.json';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: secrets.OPENAI_API_KEY,
});

const AskScreen = ({ fileContent }: any) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to send a question and get a response
  const askQuestion = async () => {
    if (!question.trim()) return;

    // Add user's question to messages first
    const newMessage = { sender: 'user' as const, text: question };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: question },
          { role: 'user', content: `Here is some file content: ${fileContent}` },
        ],
      });

      // Wait for the AI's response to finish before updating the messages state
      const aiMessage = { sender: 'ai' as const, text: response.choices[0]?.message?.content || 'No response received.' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'ai' as const, text: 'Sorry, there was an error fetching the answer.' }
      ]);
    }

    setIsLoading(false);
    setQuestion(''); // Clear the input field
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <TextInput
        style={styles.input}
        placeholder="Ask your question"
        value={question}
        onChangeText={setQuestion}
      />
      <Button title={isLoading ? "Asking..." : "Ask"} onPress={askQuestion} disabled={isLoading} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#A1CEDC',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  aiMessage: {
    backgroundColor: '#E1E1E1',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default AskScreen;
