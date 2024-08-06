import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const modelData = [
  { provider: "Bedrock", model: "Llama 3.1 Instruct (8B)", context: "128K", inputPrice: 0.0003, outputPrice: 0.0006 },
  { provider: "Bedrock", model: "Llama 3.1 Instruct (70B)", context: "128K", inputPrice: 0.00265, outputPrice: 0.0035 },
  { provider: "Bedrock", model: "Llama 3.1 Instruct (405B)", context: "128K", inputPrice: 0.00532, outputPrice: 0.016 },
  { provider: "Bedrock", model: "Claude 3.5 Sonnet", context: "200k", inputPrice: 0.003, outputPrice: 0.015 },
  { provider: "Bedrock", model: "Claude 3 Opus", context: "200k", inputPrice: 0.015, outputPrice: 0.075 },
  { provider: "Bedrock", model: "Claude 3 Haiku", context: "200k", inputPrice: 0.00025, outputPrice: 0.00125 },
  { provider: "Bedrock", model: "Claude 3 Sonnet", context: "200k", inputPrice: 0.003, outputPrice: 0.015 },
  { provider: "Azure", model: "GPT-3.5-Turbo-0125", context: "16k", inputPrice: 0.0005, outputPrice: 0.0015 },
  { provider: "Azure", model: "GPT-3.5-Turbo-Instruct", context: "4k", inputPrice: 0.0015, outputPrice: 0.002 },
  { provider: "Azure", model: "GPT-4", context: "32k", inputPrice: 0.06, outputPrice: 0.12 },
  { provider: "Azure", model: "GPT-4", context: "8k", inputPrice: 0.03, outputPrice: 0.06 },
  { provider: "Azure", model: "GPT-4-Turbo", context: "128k", inputPrice: 0.01, outputPrice: 0.03 },
  { provider: "Azure", model: "GPT-4o", context: "128k", inputPrice: 0.005, outputPrice: 0.015 },
  { provider: "Azure", model: "Llama 3.1 Instruct (8B)", context: "128K", inputPrice: 0.0003, outputPrice: 0.00061 },
  { provider: "Azure", model: "Llama 3.1 Instruct (70B)", context: "128K", inputPrice: 0.00268, outputPrice: 0.00354 },
  { provider: "Azure", model: "Llama 3.1 Instruct (405B)", context: "128K", inputPrice: 0.00533, outputPrice: 0.016 },
];

const AICostCalculator = () => {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [apiCalls, setApiCalls] = useState(100);

  const calculateCost = (inputPrice, outputPrice) => {
    const inputCost = (inputTokens * inputPrice) / 1000;
    const outputCost = (outputTokens * outputPrice) / 1000;
    const perCallCost = inputCost + outputCost;
    const totalCost = perCallCost * apiCalls;
    return { perCallCost, totalCost };
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">LLM Cost Calculator</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="inputTokens" className="block mb-1">
            Input tokens:
          </label>
          <Input
            id="inputTokens"
            type="number"
            value={inputTokens}
            onChange={(e) => setInputTokens(Number(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <label htmlFor="outputTokens" className="block mb-1">
            Output tokens:
          </label>
          <Input
            id="outputTokens"
            type="number"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <label htmlFor="apiCalls" className="block mb-1">
            API calls:
          </label>
          <Input
            id="apiCalls"
            type="number"
            value={apiCalls}
            onChange={(e) => setApiCalls(Number(e.target.value))}
            min="1"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Provider</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Context</TableHead>
            <TableHead>Input/1k Tokens</TableHead>
            <TableHead>Output/1k Tokens</TableHead>
            <TableHead>Per Call</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modelData.map((model, index) => {
            const { perCallCost, totalCost } = calculateCost(model.inputPrice, model.outputPrice);
            return (
              <TableRow key={index}>
                <TableCell>{model.provider}</TableCell>
                <TableCell>{model.model}</TableCell>
                <TableCell>{model.context}</TableCell>
                <TableCell>${model.inputPrice.toFixed(5)}</TableCell>
                <TableCell>${model.outputPrice.toFixed(5)}</TableCell>
                <TableCell>${perCallCost.toFixed(4)}</TableCell>
                <TableCell>${totalCost.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AICostCalculator;
